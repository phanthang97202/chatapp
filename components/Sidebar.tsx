import styled from "styled-components";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVerticalIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
const StyledContainer = styled.div`
  height: 100vh;
  min-width: 300px;
  max-width: 330px;
  overflow-y: scroll;
  border-right: 1px solid whitesmoke;
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`;
const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 2px;
`;
const StyledSidebarButton = styled(Button)`
  width: 100%;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
`;

const StyledUserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const StyledSearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
`;

const Sidebar = () => {
  const [signOut, loading, error] = useSignOut(auth);
  if (loading) return <h1>Đang đăng xuất...</h1>;

  const [loggedInUser, _loading, _error] = useAuthState(auth);
  const [isOpenNewConversationDialog, setIsOpenNewConversationDialog] =
    useState<boolean>(false);

  const [recipientEmail, setRecipientEmail] = useState<string>("");

  const toggleNewConversationDialog = (isOpen: boolean) => {
    setIsOpenNewConversationDialog(isOpen);
    if (!isOpen) setRecipientEmail("");
  };

  const closeNewConversationDialog = () => {
    toggleNewConversationDialog(false);
  };
  const createConversation = async () => {
    console.log("createConversation");
    setRecipientEmail("");
    toggleNewConversationDialog(false);
  };

  return (
    <StyledContainer>
      <StyledHeader>
        <Tooltip title="User name" placement="right">
          <StyledUserAvatar
            src={loggedInUser?.photoURL as string}
            alt="avatar"
          />
        </Tooltip>
        <div>
          {/* button dạng icon  */}
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <PhotoCamera />
          </IconButton>
          <IconButton>
            <LogoutIcon onClick={() => signOut()} />
          </IconButton>
        </div>
      </StyledHeader>
      <StyledSearch>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <StyledSearchInput placeholder="Nhập người dùng..." />
      </StyledSearch>
      <StyledSidebarButton
        onClick={() => {
          toggleNewConversationDialog(true);
        }}
      >
        Start new a conversation
      </StyledSidebarButton>

      {/* SHOW FORM DIALOG  */}
      <Dialog
        open={isOpenNewConversationDialog}
        onClose={closeNewConversationDialog}
      >
        <DialogTitle>New conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter email friend you want to chat
          </DialogContentText>
          <TextField
            autoFocus
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={recipientEmail}
            onChange={(event) => {
              setRecipientEmail(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNewConversationDialog}>Cancel</Button>
          <Button disabled={!recipientEmail} onClick={createConversation}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default Sidebar;
