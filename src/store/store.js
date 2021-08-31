import create from "zustand";

const initialState = {
    id: null,
    data: {
        fullnames: null,
        employmentStatus: null,
        skill: null
    },
    documents: [],
    applications: [],
    imageKey: {
        id: null,
        key: null,
        url: null
    }
}

export const useStore = create(set => ({
    about: initialState,
    deleteApplicationRecord: (id) => set(state => ({
        about: {
            ...state.about, 
            applications: state.about.applications.filter(application => application.id !== id)
        }
    })), 
    setApplicationRecord: (record) => set(state => ({
        about: {
            ...state.about,
            applications: [ 
                ...state.about.applications,
                record
            ]
        }
    })),
    deleteDocumentRecord: (id) => set(state => ({
        about: {
            ...state.about, 
            documents: state.about.documents.filter(doc => doc.id !== id)
        }
    })), 
    setDocumentRecord: (record) => set(state => ({
        about: {
            ...state.about,
            documents: [ 
                ...state.about.documents,
                record
            ]
        }
    })),
    setImageUrl: (url) => set(state => ({
        about: {
            ...state.about,
            imageKey: {
                ...state.about.imageKey,
                url
            }
        }
    })),
    setId: (id) => set(state => ({
        about: {
            ...state.about,
            id,
        }
    })),
    setImageKey: (id, key) => set(state => ({
        about: {
            ...state.about,
            imageKey: {
                id,
                key
            }
        }
    })),
    updateAbout: (userAbout) => set(state => ({ 
        about: {
            ...state.about,
            id: userAbout.id,
            data: {
                fullnames: userAbout.fullnames,
                skill: userAbout.skill,
                employmentStatus: userAbout.employmentStatus
            }
        }
    }))
}));
