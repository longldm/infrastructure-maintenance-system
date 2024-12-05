import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from '../../utils/sendRequest';

// export const getUserInfo = createAsyncThunk(
//     'api/get-user-info',
//     async (thunkApi) => {
//         return await sendRequest(
//             "/user/my-info",
//             {
//                 method: "GET",
//                 thunkApi
//             }
//         );
//     }
// );
