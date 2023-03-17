import { Conversation } from "../src/types";
import React from "react";
import styled from "styled-components";
const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-all;
  :hover {
    background-color: #e9eaeb;
  }
`;
const ConversationSelect = ({
  id,
  conversationUsers,
}: {
  id: string;
  conversationUsers: Conversation["users"];
}) => {
  return (
    <StyledContainer>
      {id} - {JSON.stringify(conversationUsers)}
    </StyledContainer>
  );
};

export default ConversationSelect;
