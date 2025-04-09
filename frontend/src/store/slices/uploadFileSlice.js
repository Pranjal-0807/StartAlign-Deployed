import useAxios from "../../hooks/useAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    files: [],
    errorMsg: "",
    successMsg: "",
    loading: false,
    uploadedFile: null,
};

const fileUploadSlice = createSlice({
    name: "files",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Files
            .addCase(fetchFiles.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFiles.fulfilled, (state, action) => {
                state.loading = false;
                state.files = action.payload;
            })
            .addCase(fetchFiles.rejected, (state) => {
                state.loading = false;
                state.errorMsg = "Error fetching files";
            })

            // Upload File
            .addCase(uploadFile.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.loading = false;
                state.uploadedFile = action.payload.fileUrl;
                state.successMsg = "File uploaded successfully!";
                state.files.push(action.payload);
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.loading = false;
                state.errorMsg = action.payload;
            });
    },
});

export default fileUploadSlice.reducer;

export const fetchFiles = createAsyncThunk("files/fetchFiles", async (_, { rejectWithValue }) => {
    try {
        const [makeRequest] = useAxios('GET');
        const response = await makeRequest("/files");
        return response.data;
    } catch (errorMsg) {
        return rejectWithValue("Error fetching files");
    }
});

export const uploadFile = createAsyncThunk("files/uploadFile", async (file, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log("Form Data", formData.get("file"));
    try {
        const [makeRequest] = useAxios('POST');
        const response = await makeRequest("/files/upload", formData, { "Content-Type": "multipart/form-data" });
        console.log(response.data);
        return response.data.file;
    } catch (errorMsg) {
        console.error("Error uploading file:", errorMsg);
        return rejectWithValue("Error uploading file");
    }
});
