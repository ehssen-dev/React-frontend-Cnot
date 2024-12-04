/*import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchMails,
  receiveMail,
  sendMail,
  archiveMail,
  qualifyMail,
} from "../../services/CommunicationInterne/mailService";

export const fetchMailsThunk = createAsyncThunk("mail/fetchMails", async () => {
  return await fetchMails();
});

export const receiveMailThunk = createAsyncThunk("mail/receiveMail", async (mail) => {
  return await receiveMail(mail);
});

export const sendMailThunk = createAsyncThunk("mail/sendMail", async (mail) => {
  return await sendMail(mail);
});

export const archiveMailThunk = createAsyncThunk("mail/archiveMail", async (mailId) => {
  return await archiveMail(mailId);
});

export const qualifyMailThunk = createAsyncThunk(
  "mail/qualifyMail",
  async ({ mailId, qualificationType }) => {
    return await qualifyMail({ mailId, qualificationType });
  }
);
*/
