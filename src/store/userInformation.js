import create from "zustand";

export const userInformation = create(set => ({
    about: {
        id: null,
        fullnames: null,
        employmentStatus: null,
        skill: null,
        imageKey: null
    },
    updateAbout: (data) => set(state => ({ data }))
}));
