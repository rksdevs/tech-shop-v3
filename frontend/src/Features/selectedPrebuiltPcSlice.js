import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('selectedPrebuiltPc') ? JSON.parse(localStorage.getItem('selectedPrebuiltPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, cabinet:{}}; 

const selectedPrebuiltPcSlice = createSlice({
    name: "selectedPrebuiltPc",
    initialState,
    reducers: {
        addCpuSelectedPrebuiltPc: (state, action) => {
            const cpu = action.payload;
            state.cpu = cpu;
            const selectedPrebuiltPc = localStorage.getItem('selectedPrebuiltPc') ? JSON.parse(localStorage.getItem('selectedPrebuiltPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, cabinet:{}};
            selectedPrebuiltPc.cpu = cpu;
            localStorage.setItem("selectedPrebuiltPc",JSON.stringify(selectedPrebuiltPc))
        },
        addMotherboardSelectedPrebuiltPc: (state, action) => {
            const motherboard = action.payload;
            state.motherboard = motherboard;
            const selectedPrebuiltPc = localStorage.getItem('selectedPrebuiltPc') ? JSON.parse(localStorage.getItem('selectedPrebuiltPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, cabinet:{}};
            selectedPrebuiltPc.motherboard = motherboard;
            localStorage.setItem("selectedPrebuiltPc",JSON.stringify(selectedPrebuiltPc))
        },
        addCoolingSystemSelectedPrebuiltPc: (state, action) => {
            const coolingSystem = action.payload;
            state.coolingSystem = coolingSystem;
            const selectedPrebuiltPc = localStorage.getItem('selectedPrebuiltPc') ? JSON.parse(localStorage.getItem('selectedPrebuiltPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, cabinet:{}};
            selectedPrebuiltPc.coolingSystem = coolingSystem;
            localStorage.setItem("selectedPrebuiltPc",JSON.stringify(selectedPrebuiltPc))
        },
        addRamSelectedPrebuiltPc: (state, action) => {
            const ram = action.payload;
            state.ram = ram;
            const selectedPrebuiltPc = localStorage.getItem('selectedPrebuiltPc') ? JSON.parse(localStorage.getItem('selectedPrebuiltPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, cabinet:{}};
            selectedPrebuiltPc.ram = ram;
            localStorage.setItem("selectedPrebuiltPc",JSON.stringify(selectedPrebuiltPc))
        },
        addSsdSelectedPrebuiltPc: (state, action) => {
            const ssd = action.payload;
            state.ssd = ssd;
            const selectedPrebuiltPc = localStorage.getItem('selectedPrebuiltPc') ? JSON.parse(localStorage.getItem('selectedPrebuiltPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, cabinet:{}};
            selectedPrebuiltPc.ssd = ssd;
            localStorage.setItem("selectedPrebuiltPc",JSON.stringify(selectedPrebuiltPc))
        },
        addHddSelectedPrebuiltPc: (state, action) => {
            const hdd = action.payload;
            state.hdd = hdd;
            const selectedPrebuiltPc = localStorage.getItem('selectedPrebuiltPc') ? JSON.parse(localStorage.getItem('selectedPrebuiltPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, cabinet:{}}
            selectedPrebuiltPc.hdd = hdd;
            localStorage.setItem("selectedPrebuiltPc",JSON.stringify(selectedPrebuiltPc))
        },
        addGpuSelectedPrebuiltPc: (state, action) => {
            const gpu = action.payload;
            state.gpu = gpu;
            const selectedPrebuiltPc = localStorage.getItem('selectedPrebuiltPc') ? JSON.parse(localStorage.getItem('selectedPrebuiltPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, cabinet:{}};
            selectedPrebuiltPc.gpu = gpu;
            localStorage.setItem("selectedPrebuiltPc",JSON.stringify(selectedPrebuiltPc))
        },
        addPsuSelectedPrebuiltPc: (state, action) => {
            const psu = action.payload;
            state.psu = psu;
            const selectedPrebuiltPc = localStorage.getItem('selectedPrebuiltPc') ? JSON.parse(localStorage.getItem('selectedPrebuiltPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, cabinet:{}};
            selectedPrebuiltPc.psu = psu;
            localStorage.setItem("selectedPrebuiltPc",JSON.stringify(selectedPrebuiltPc))
        },
        addCabinetSelectedPrebuiltPc: (state, action) => {
            const cabinet = action.payload;
            state.cabinet = cabinet;
            const selectedPrebuiltPc = localStorage.getItem('selectedPrebuiltPc') ? JSON.parse(localStorage.getItem('selectedPrebuiltPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, cabinet:{}};
            selectedPrebuiltPc.cabinet = cabinet;
            localStorage.setItem("selectedPrebuiltPc",JSON.stringify(selectedPrebuiltPc))
        },
        clearAllBuildSelectedPrebuiltPc: (state, action) => {
            const selectedPrebuiltPc = {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, cabinet:{}};
            localStorage.setItem('selectedPrebuiltPc', JSON.stringify(selectedPrebuiltPc));
            return selectedPrebuiltPc; 
        },  
    }
})

export const {addCpuSelectedPrebuiltPc, addCabinetSelectedPrebuiltPc, addCoolingSystemSelectedPrebuiltPc, addGpuSelectedPrebuiltPc, addHddSelectedPrebuiltPc, addMotherboardSelectedPrebuiltPc, addPsuSelectedPrebuiltPc, addRamSelectedPrebuiltPc, addSsdSelectedPrebuiltPc} = selectedPrebuiltPcSlice.actions;

export default selectedPrebuiltPcSlice.reducer;