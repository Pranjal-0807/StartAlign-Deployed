import useAxios from '../../hooks/useAxios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    projects: [],
    loading: false,
    error: null
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleAsyncAction(builder, fetchProjects, 'projects')
        handleAsyncAction(builder, createProject, 'projects')
        handleAsyncAction(builder, deleteProject, 'projects', true)
    }
});

export default projectSlice.reducer;

const handleAsyncAction = (builder, action, stateKey, isDelete = false) => {
    builder
        .addCase(action.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(action.fulfilled, (state, { payload }) => {
            state.loading = false;
            if (isDelete) {
                state[stateKey] = state[stateKey].filter(project => project._id !== payload);
            }
            else if (Array.isArray(payload)) {
                state[stateKey] = payload ?? [];
            }
            else if (payload && typeof payload === 'object') {
                state[stateKey] = [...state[stateKey], payload];
            }
        })

        .addCase(action.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
}


export const fetchProjects = createAsyncThunk(
    'project/fetchProjects',
    async (_, thunkAPI) => {
        try {
            const [makeRequest] = useAxios('GET');
            const response = await makeRequest('/projects');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);

export const createProject = createAsyncThunk(
    'project/createProject',
    async (projectDetails, thunkAPI) => {
        try {
            const [makeRequest] = useAxios('POST');
            const response = await makeRequest('/projects', projectDetails);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
)

export const deleteProject = createAsyncThunk(
    'project/deleteProject',
    async (projectId, thunkAPI) => {
        try {
            const [makeRequest] = useAxios('DELETE');
            await makeRequest(`/projects/${projectId}`);
            return projectId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);
