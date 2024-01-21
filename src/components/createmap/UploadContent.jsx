import { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import Upload from '../../assets/icon/Upload';
import Warning from '../../assets/icon/Warning';
import Cancel from '../../assets/icon/Cancel';
import MoreOption from '../../assets/icon/MoreOption';
import AddOptionModal from './AddOptionModal';
import AlertModal from './AlertModal';

function UploadContent() {
  const [fileList, setFileList] = useState([]);
  const [fileImgSrcList, setFileImgSrcList] = useState([]);
  const [fileLabelDragEnter, setFileLabelDragEnter] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [titleWarningDisplay, setTitleWarningDisplay] = useState(false);

  const [detail, setDetail] = useState('');

  const [folder, setFolder] = useState('');
  const [folderOptionList, setFolderOptionList] = useState(['방문 맛집 기록폴더', '대학시절 여행기록']);
  const [selectBoxOpen, setSelectBoxOpen] = useState(false);
  const [addOptionModalOpen, setAddOptionModalOpen] = useState(false);

  const [tagList, setTagList] = useState([]);
  const [tagToAdd, setTagToAdd] = useState('');
  const [tagWarningDisplay, setTagWarningDisplay] = useState(false);

  const [isActiveSubmitBtn, setIsActiveSubmitBtn] = useState(false);

  useEffect(() => {
    if (title !== '' && tagList.length !== 0 && fileList.length !== 0) {
      setIsActiveSubmitBtn(true);
    } else {
      setIsActiveSubmitBtn(false);
    }
  }, [title, tagList, fileList]);

  const fileLabelDragEnterHandler = () => {
    setFileLabelDragEnter(true);
  };

  const fileLabelDragLeaveHandler = () => {
    setFileLabelDragEnter(false);
  };

  const fileLabelDragOverHandler = (e) => {
    e.preventDefault();
  };

  const convertFilesToUrls = (files) =>
    Promise.all(
      files.map(
        (item) =>
          new Promise((resolve) => {
            const reader = new FileReader();

            reader.onloadend = () => {
              resolve(reader.result);
            };

            reader.readAsDataURL(item);
          }),
      ),
    );

  const fileLabelDropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFileLabelDragEnter(false);

    const data = e.dataTransfer;
    const dropFileList = [];

    if (fileList.length + data.items.length > 10) {
      setAlertModalOpen(true);
      return;
    }

    if (data.items) {
      for (let i = 0; i < data.items.length; i++) {
        if (data.items[i].kind === 'file' && data.items[i].type.startsWith('image/')) {
          dropFileList.push(data.items[i].getAsFile());
        }
      }

      convertFilesToUrls(dropFileList).then((results) => {
        setFileList((prevFileList) => prevFileList.concat(dropFileList));
        setFileImgSrcList((prevFileImgSrcList) => prevFileImgSrcList.concat(results));
      });
    }
  };

  const uploadImgHandler = (e) => {
    const uploadFileList = Array.from(e.target.files);

    if (fileList.length + uploadFileList.length > 10) {
      setAlertModalOpen(true);
      return;
    }

    convertFilesToUrls(uploadFileList).then((results) => {
      setFileList((prevFileList) => prevFileList.concat(uploadFileList));
      setFileImgSrcList((prevFileImgSrcList) => prevFileImgSrcList.concat(results));
    });
  };

  const deleteUploadedImgHandler = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    const deletedFileList = [...fileList];
    deletedFileList.splice(index, 1);

    const deletedFileImgSrcList = [...fileImgSrcList];
    deletedFileImgSrcList.splice(index, 1);

    setFileList(deletedFileList);
    setFileImgSrcList(deletedFileImgSrcList);
  };

  const changeTitleHandler = (e) => {
    const changedTitle = e.target.value;
    setTitle(changedTitle);

    if (changedTitle === '') {
      setTitleWarningDisplay(true);
    } else {
      setTitleWarningDisplay(false);
    }
  };

  const addTagHandler = (e) => {
    const newTag = e.target.value;
    setTagToAdd(newTag);

    if (tagList.length === 0 && newTag === '') {
      setTagWarningDisplay(true);
    } else {
      setTagWarningDisplay(false);
    }
  };

  const createTagHandler = () => {
    setTagToAdd('');

    if (tagToAdd === '' || tagList.includes(tagToAdd)) {
      return;
    }
    const newTagList = [...tagList];
    newTagList.push(tagToAdd);
    setTagList(newTagList);
  };

  const deleteTagHandler = (index) => {
    const newTagList = [...tagList];
    newTagList.splice(index, 1);
    setTagList(newTagList);

    if (newTagList.length === 0) {
      setTagWarningDisplay(true);
    }
  };

  const clickSelectBoxHandler = () => {
    setSelectBoxOpen((prev) => !prev);
  };

  const clickOptionHandler = (e) => {
    setFolder(e.target.innerText);
    setSelectBoxOpen(false);
  };

  const clickAddOptionHandler = () => {
    setAddOptionModalOpen(true);
  };

  return (
    <UploadContentFormContainer
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <UploadContentForm>
        <UploadImgLabel
          htmlFor="file"
          onDragEnter={fileLabelDragEnterHandler}
          onDragLeave={fileLabelDragLeaveHandler}
          onDragOver={fileLabelDragOverHandler}
          onDrop={fileLabelDropHandler}
          $fileLabelDragEnter={fileLabelDragEnter}
          $fileList={fileList}
        >
          {fileImgSrcList.length !== 0 ? (
            fileImgSrcList.map((url, index) => (
              <UploadedImgContainer>
                <UploadedImg key={index + 1} src={url} alt="업로드한 사진" />
                <DeleteUploadedImg
                  onClick={(e) => {
                    deleteUploadedImgHandler(e, index);
                  }}
                >
                  <Cancel />
                </DeleteUploadedImg>
              </UploadedImgContainer>
            ))
          ) : (
            <UploadContainer>
              <UploadImg>
                <Upload />
                <UploadImgTitle>
                  파일을 선택하거나 여기로 끌어다
                  <br /> 놓아주세요.(10장이내)
                </UploadImgTitle>
              </UploadImg>
              <UploadImgNotice>
                20MB 미만 고화질 .jpg 파일사용을 권장합니다.(exif 이미지 포멧에서 위치, 시간정보를 불러들이므로 안드로이드 폰으로 촬용한 사진은
                위치정보 로딩에 실패할 수 있습니다.)
              </UploadImgNotice>
            </UploadContainer>
          )}
        </UploadImgLabel>
        <UploadImgInput type="file" id="file" accept="image/*" onChange={uploadImgHandler} multiple />
        <UploadDetailContainer>
          <UploadDetail>
            <UploadDetailLabel htmlFor="title">제목</UploadDetailLabel>
            <UploadDetailInput type="text" id="title" placeholder="지도의 제목을 작성해주세요." value={title} onChange={changeTitleHandler} />
            <Notice $display={titleWarningDisplay}>
              <Warning />
              제목은 필수로 작성해주셔야 합니다.
            </Notice>
          </UploadDetail>
          <UploadDetail>
            <UploadDetailLabel htmlFor="detail">설명</UploadDetailLabel>
            <UploadDetailTextarea
              id="detail"
              placeholder="지도에 대한 자세한 설명을 작성해주세요."
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          </UploadDetail>
          <UploadDetail>
            <UploadDetailLabel htmlFor="folder">폴더</UploadDetailLabel>
            <UploadDetailSelect
              type="text"
              id="folder"
              placeholder="폴더 선택"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              onClick={clickSelectBoxHandler}
              readOnly
            />
            <ShowOptionIcon $selectBoxOpen={selectBoxOpen} onClick={clickSelectBoxHandler}>
              <MoreOption />
            </ShowOptionIcon>
            <OptionContainer $selectBoxOpen={selectBoxOpen}>
              {folderOptionList.map((item, index) => (
                <Option key={index + 1} onClick={clickOptionHandler}>
                  {item}
                </Option>
              ))}
              <AddOption onClick={clickAddOptionHandler}>폴더 추가</AddOption>
            </OptionContainer>
          </UploadDetail>
          <UploadDetail>
            <UploadDetailLabel htmlFor="tag">태그된 주제({tagList.length})개</UploadDetailLabel>
            <UploadDetailInput
              id="tag"
              placeholder="태그를 추가해주세요."
              value={tagToAdd}
              onChange={addTagHandler}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  createTagHandler();
                }
              }}
            />
            <TagList>
              {tagList.map((item, index) => (
                <AddedTag key={index + 1}>
                  #{item}
                  <DeleteTag onClick={() => deleteTagHandler(index)}>
                    <Cancel />
                  </DeleteTag>
                </AddedTag>
              ))}
              {tagToAdd !== '' && (
                <CreateTag onClick={createTagHandler}>
                  <Tag>#{tagToAdd}</Tag>&nbsp;생성
                </CreateTag>
              )}
            </TagList>
            <Notice $display={tagWarningDisplay}>
              <Warning />
              최소 한 개 이상의 태그를 하셔야 합니다.
            </Notice>
          </UploadDetail>
        </UploadDetailContainer>
      </UploadContentForm>
      <UploadContentNotice>
        불법 촬영 콘텐츠 등을 게시하는 경우 LIVIEW는 한국 전기통신사업법 제22-5(1)조에 따라 해당 콘텐츠의 액세스를 삭제하거나 차단할 수 있으며,
        사용자는 관련 법률 및 규정에 따라 처벌을 받을 수 있습니다.
      </UploadContentNotice>
      <SubmitBtn type="submit" value="저장하기" isActiveSubmitBtn={isActiveSubmitBtn} />
      {addOptionModalOpen && (
        <AddOptionModal setAddOptionModalOpen={setAddOptionModalOpen} folderOptionList={folderOptionList} setFolderOptionList={setFolderOptionList} />
      )}
      {alertModalOpen && <AlertModal setAlertModalOpen={setAlertModalOpen} />}
      {(addOptionModalOpen || alertModalOpen) && <Overlay />}
    </UploadContentFormContainer>
  );
}

const UploadContentFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const UploadContentForm = styled.div`
  display: flex;
  gap: 52px;
  position: relative;
`;

const UploadImgLabel = styled.label`
  display: ${(props) => (props.$fileList.length !== 0 ? 'grid' : 'block')};
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 8px;
  width: 320px;
  aspect-ratio: 3/4;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 20px;
  border: 2px dashed ${(props) => (props.$fileLabelDragEnter ? colors.mainColor : colors.darkGray)};
  background: ${(props) => (props.$fileLabelDragEnter ? colors.lightBlue : colors.lightGray)};
  cursor: pointer;
`;

const UploadContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 110px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const UploadImgInput = styled.input`
  display: none;
`;

const UploadImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadImgTitle = styled.div`
  padding-top: 10px;
  font-size: 15px;
  line-height: 122%;
  text-align: center;
`;

const UploadImgNotice = styled.div`
  font-size: 10px;
  line-height: 122%;
  text-align: center;
  color: ${colors.darkGray};
`;

const UploadedImgContainer = styled.div`
  position: relative;
`;

const DeleteUploadedImg = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  z-index: 1;
  cursor: pointer;
`;

const UploadedImg = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 10px;
`;

const UploadDetailContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
`;

const UploadDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;
  position: relative;
`;

const UploadDetailLabel = styled.label`
  font-size: 15px;
  line-height: 122%;
`;

const UploadDetailInput = styled.input`
  width: 400px;
  height: 38px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1.5px solid ${colors.darkGray};
  font-family: KNU20TRUTH-Regular;
`;

const UploadDetailTextarea = styled.textarea`
  width: 400px;
  height: 140px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1.5px solid ${colors.darkGray};
  font-family: KNU20TRUTH-Regular;
`;

const UploadDetailSelect = styled.input`
  width: 400px;
  height: 38px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1.5px solid ${colors.darkGray};
  font-family: KNU20TRUTH-Regular;
  cursor: pointer;
`;

const Notice = styled.div`
  color: ${colors.red};
  font-size: 10px;
  line-height: 122%;
  gap: 7px;
  align-items: center;
  display: ${(props) => (props.$display ? 'flex' : 'none')};
`;

const CreateTag = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  width: fit-content;
  height: 100%;
`;

const AddedTag = styled.div`
  background-color: ${colors.lightGray};
  width: fit-content;
  padding: 4px;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Tag = styled.div`
  background-color: ${colors.lightBlue};
  width: fit-content;
  padding: 4px;
  border-radius: 4px;
`;

const TagList = styled.div`
  display: flex;
  gap: 4px;
  width: 400px;
`;

const DeleteTag = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ShowOptionIcon = styled.div`
  position: absolute;
  top: 36px;
  right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transform: ${(props) => (props.$selectBoxOpen ? 'rotate(180deg)' : 'rotate(0)')};
`;

const OptionContainer = styled.div`
  width: 400px;
  height: fit-content;
  box-sizing: border-box;
  border: 1.5px solid ${colors.lightGray};
  border-radius: 10px;
  font-size: 13px;
  color: ${colors.darkGray};
  cursor: pointer;
  display: ${(props) => (props.$selectBoxOpen ? 'block' : 'none')};
  position: absolute;
  top: 70px;
  background-color: white;
  z-index: 1;
  overflow: hidden;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Option = styled.div`
  width: 100%;
  height: 35px;
  box-sizing: border-box;
  padding: 5px 8px;
  border-bottom: 1.5px solid ${colors.lightGray};
  display: flex;
  align-items: center;
  &: hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const AddOption = styled.div`
  width: 100%;
  height: 35px;
  box-sizing: border-box;
  padding: 5px 8px;
  display: flex;
  align-items: center;
  &: hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const UploadContentNotice = styled.div`
  width: 400px;
  font-size: 10px;
  line-height: 122%;
  color: ${colors.darkGray};
`;

const SubmitBtn = styled.input`
  font-family: KNU20TRUTH-Regular;
  display: inline-flex;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  line-height: 122%;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => (props.isActiveSubmitBtn ? colors.mainColor : colors.lightGray)};
  color: ${(props) => (props.isActiveSubmitBtn ? 'white' : 'black')};
  margin-top: 20px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

export default UploadContent;
