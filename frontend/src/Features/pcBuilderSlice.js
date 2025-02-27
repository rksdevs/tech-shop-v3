import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0}; 



const pcBuilderSlice = createSlice({
    name: 'customPc',
    initialState,
    reducers: {
        addCpu: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentTotalActualPrice = state.totalActualPrice;
            if(Object.keys(state.cpu).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.cpu?.price *state.cpu.qty); 
                currentTotalActualPrice = currentTotalActualPrice -(state.cpu?.currentPrice *state.cpu.qty);
            }
            const cpu = action.payload;
            state.cpu = cpu;
            state.totalBuildPrice = currentBuildPrice + (cpu?.price * cpu.qty);
            state.totalActualPrice = currentTotalActualPrice + (cpu?.currentPrice * cpu.qty);
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            customPc.cpu = cpu;
            customPc.totalBuildPrice = currentBuildPrice + (cpu?.price * cpu.qty);
            customPc.totalActualPrice = currentBuildPrice + (cpu?.currentPrice * cpu.qty);
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addMotherboard: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentTotalActualPrice = state.totalActualPrice;
            if(Object.keys(state.motherboard).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.motherboard?.price *state.motherboard.qty);
                currentTotalActualPrice = currentTotalActualPrice -(state.motherboard?.currentPrice *state.motherboard.qty);
            }
            const motherboard = action.payload;
            state.motherboard = motherboard;
            state.totalBuildPrice = currentBuildPrice + (motherboard?.price * motherboard.qty);
            state.totalActualPrice = currentTotalActualPrice + (motherboard?.currentPrice * motherboard.qty);
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            customPc.motherboard = motherboard;
            customPc.totalBuildPrice = currentBuildPrice + (motherboard?.price * motherboard.qty);
            customPc.totalActualPrice = currentBuildPrice + (motherboard?.currentPrice * motherboard.qty);
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addCoolingSystem: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentTotalActualPrice = state.totalActualPrice;
            if(Object.keys(state.coolingSystem).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.coolingSystem?.price *state.coolingSystem.qty);
                currentTotalActualPrice = currentTotalActualPrice -(state.coolingSystem?.currentPrice *state.coolingSystem.qty);

            }
            const coolingSystem = action.payload;
            state.coolingSystem = coolingSystem;
            state.totalBuildPrice = currentBuildPrice + (coolingSystem?.price * coolingSystem.qty);
            state.totalActualPrice = currentTotalActualPrice + (coolingSystem?.currentPrice * coolingSystem.qty);
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            customPc.coolingSystem = coolingSystem
            customPc.totalBuildPrice = currentBuildPrice + (coolingSystem?.price * coolingSystem.qty);
            customPc.totalActualPrice = currentBuildPrice + (coolingSystem?.currentPrice * coolingSystem.qty);
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addRam: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentTotalActualPrice = state.totalActualPrice;
            if(Object.keys(state.ram).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.ram?.price *state.ram.qty);
                currentTotalActualPrice = currentTotalActualPrice -(state.ram?.currentPrice *state.ram.qty);

            }
            const ram = action.payload;
            state.ram = ram;
            state.totalBuildPrice = currentBuildPrice + (ram?.price * ram.qty);
            state.totalActualPrice = currentTotalActualPrice + (ram?.currentPrice * ram.qty);
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            customPc.ram = ram;
            customPc.totalBuildPrice = currentBuildPrice + (ram?.price * ram.qty);
            customPc.totalActualPrice = currentBuildPrice + (ram?.currentPrice * ram.qty);
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addSsd: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentTotalActualPrice = state.totalActualPrice;
            if(Object.keys(state.ssd).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.ssd?.price *state.ssd.qty);
                currentTotalActualPrice = currentTotalActualPrice -(state.ssd?.currentPrice *state.ssd.qty);
            }
            const ssd = action.payload;
            state.ssd = ssd;
            state.totalBuildPrice = currentBuildPrice + (ssd?.price * ssd.qty);
            state.totalActualPrice = currentTotalActualPrice + (ssd?.currentPrice * ssd.qty);
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            customPc.ssd = ssd;
            customPc.totalBuildPrice = currentBuildPrice + (ssd?.price * ssd.qty);
            customPc.totalActualPrice = currentBuildPrice + (ssd?.currentPrice * ssd.qty);
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addHdd: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentTotalActualPrice = state.totalActualPrice;
            if(Object.keys(state.hdd).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.hdd?.price *state.hdd.qty);
                currentTotalActualPrice = currentTotalActualPrice -(state.hdd?.currentPrice *state.hdd.qty);
            }
            const hdd = action.payload;
            state.hdd = hdd;
            state.totalBuildPrice = currentBuildPrice + (hdd?.price * hdd.qty);
            state.totalActualPrice = currentTotalActualPrice + (hdd?.currentPrice * hdd.qty);
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            customPc.hdd = hdd;
            customPc.totalBuildPrice = currentBuildPrice + (hdd?.price * hdd.qty);
            customPc.totalActualPrice = currentBuildPrice + (hdd?.currentPrice * hdd.qty);
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addGpu: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentTotalActualPrice = state.totalActualPrice;
            if(Object.keys(state.gpu).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.gpu?.price *state.gpu.qty);
                currentTotalActualPrice = currentTotalActualPrice -(state.gpu?.currentPrice *state.gpu.qty);
            }
            const gpu = action.payload;
            state.gpu = gpu;
            state.totalBuildPrice = currentBuildPrice + (gpu?.price * gpu.qty);
            state.totalActualPrice = currentTotalActualPrice + (gpu?.currentPrice * gpu.qty);
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            customPc.gpu = gpu;
            customPc.totalBuildPrice = currentBuildPrice + (gpu?.price * gpu.qty);
            customPc.totalActualPrice = currentBuildPrice + (gpu?.currentPrice * gpu.qty);
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addPsu: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentTotalActualPrice = state.totalActualPrice;
            if(Object.keys(state.psu).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.psu?.price *state.psu.qty);
                currentTotalActualPrice = currentTotalActualPrice -(state.psu?.currentPrice *state.psu.qty);
            }
            const psu = action.payload;
            state.psu = psu;
            state.totalBuildPrice = currentBuildPrice + (psu?.price * psu.qty);
            state.totalActualPrice = currentTotalActualPrice + (psu?.currentPrice * psu.qty);
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            customPc.psu = psu;
            customPc.totalBuildPrice = currentBuildPrice + (psu?.price * psu.qty);
            customPc.totalActualPrice = currentBuildPrice + (psu?.currentPrice * psu.qty);
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addMonitor: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentTotalActualPrice = state.totalActualPrice;
            if(Object.keys(state.monitor).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.monitor?.price *state.monitor.qty);
                currentTotalActualPrice = currentTotalActualPrice -(state.monitor?.currentPrice *state.monitor.qty);
            }
            const monitor = action.payload;
            state.monitor = monitor;
            state.totalBuildPrice = currentBuildPrice + (monitor?.price * monitor.qty);
            state.totalActualPrice = currentTotalActualPrice + (monitor?.currentPrice * monitor.qty);
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            customPc.monitor = monitor;
            customPc.totalBuildPrice = currentBuildPrice + (monitor?.price * monitor.qty);
            customPc.totalActualPrice = currentBuildPrice + (monitor?.currentPrice * monitor.qty);
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addKeyboard: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentTotalActualPrice = state.totalActualPrice;
            if(Object.keys(state.keyboard).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.keyboard?.price *state.keyboard.qty);
                currentTotalActualPrice = currentTotalActualPrice -(state.keyboard?.currentPrice *state.keyboard.qty);
            }
            const keyboard = action.payload;
            state.keyboard = keyboard;
            state.totalBuildPrice = currentBuildPrice + (keyboard?.price * keyboard.qty);
            state.totalActualPrice = currentTotalActualPrice + (keyboard?.currentPrice * keyboard.qty);
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            customPc.keyboard = keyboard;
            customPc.totalBuildPrice = currentBuildPrice + (keyboard?.price * keyboard.qty);
            customPc.totalActualPrice = currentBuildPrice + (keyboard?.currentPrice * keyboard.qty);
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addMouse: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentTotalActualPrice = state.totalActualPrice;
            if(Object.keys(state.mouse).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.mouse?.price *state.mouse.qty);
                currentTotalActualPrice = currentTotalActualPrice -(state.mouse?.currentPrice *state.mouse.qty);
            }
            const mouse = action.payload;
            state.mouse = mouse;
            state.totalBuildPrice = currentBuildPrice + (mouse?.price * mouse.qty);
            state.totalActualPrice = currentTotalActualPrice + (mouse?.currentPrice * mouse.qty);
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            customPc.mouse = mouse;
            customPc.totalBuildPrice = currentBuildPrice + (mouse?.price * mouse.qty);
            customPc.totalActualPrice = currentBuildPrice + (mouse?.currentPrice * mouse.qty);
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addMousepad: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentTotalActualPrice = state.totalActualPrice;
            if(Object.keys(state.mousepad).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.mousepad?.price *state.mousepad.qty);
                currentTotalActualPrice = currentTotalActualPrice -(state.mousepad?.currentPrice *state.mousepad.qty);
            }
            const mousepad = action.payload;
            state.mousepad = mousepad;
            state.totalBuildPrice = currentBuildPrice + (mousepad?.price * mousepad.qty);
            state.totalActualPrice = currentTotalActualPrice + (mousepad?.currentPrice * mousepad.qty);
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            customPc.mousepad = mousepad;
            customPc.totalBuildPrice = currentBuildPrice + (mousepad?.price * mousepad.qty);
            customPc.totalActualPrice = currentBuildPrice + (mousepad?.currentPrice * mousepad.qty);
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addHeadphone: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentTotalActualPrice = state.totalActualPrice;
            if(Object.keys(state.headphone).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.headphone?.price *state.headphone.qty);
                currentTotalActualPrice = currentTotalActualPrice -(state.headphone?.currentPrice *state.headphone.qty);
            }
            const headphone = action.payload;
            state.headphone = headphone;
            state.totalBuildPrice = currentBuildPrice + (headphone?.price * headphone.qty);
            state.totalActualPrice = currentTotalActualPrice + (headphone?.currentPrice * headphone.qty);
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            customPc.headphone = headphone;
            customPc.totalBuildPrice = currentBuildPrice + (headphone?.price * headphone.qty);
            customPc.totalActualPrice = currentBuildPrice + (headphone?.currentPrice * headphone.qty);
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        addCabinet: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentTotalActualPrice = state.totalActualPrice;
            if(Object.keys(state.cabinet).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.cabinet?.price *state.cabinet.qty);
                currentTotalActualPrice = currentTotalActualPrice -(state.cabinet?.currentPrice *state.cabinet.qty);
            }
            const cabinet = action.payload;
            state.cabinet = cabinet;
            state.totalBuildPrice = currentBuildPrice + (cabinet?.price * cabinet.qty);
            state.totalActualPrice = currentTotalActualPrice + (cabinet?.currentPrice * cabinet.qty);
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            customPc.cabinet = cabinet;
            customPc.totalBuildPrice = currentBuildPrice + (cabinet?.price * cabinet.qty);
            customPc.totalActualPrice = currentBuildPrice + (cabinet?.currentPrice * cabinet.qty);
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        clearAllBuild: (state, action) => {
            const customPc = {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            localStorage.setItem('customPc', JSON.stringify(customPc));
            return customPc; 
        },
        deleteCurrentSelection: (state, action) => {
            const item = action.payload;
            state.totalBuildPrice = state.totalBuildPrice - (state[item]?.price * state[item]?.qty);
            state.totalActualPrice = state.totalActualPrice - (state[item]?.currentPrice * state[item]?.qty);
            state[item] = {};
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};
            customPc.totalBuildPrice = customPc.totalBuildPrice - (customPc[item]?.price * customPc[item]?.qty);
            customPc.totalActualPrice = customPc.totalActualPrice - (customPc[item]?.currentPrice * customPc[item]?.qty);
            customPc[item] = {};
            localStorage.setItem("customPc",JSON.stringify(customPc))
        },
        deleteCurrentPriceFromTotalPrice : (state, action) => {
            console.log(action.payload);
            const priceToDeduct = state[action.payload]?.price * state[action.payload].qty;
            const actualPriceToDeduct = state[action.payload]?.currentPrice * state[action.payload].qty;
            state.totalBuildPrice = state.totalBuildPrice - priceToDeduct;
            state.totalActualPrice = state.totalActualPrice - actualPriceToDeduct;
            const customPc = localStorage.getItem('customPc') ? JSON.parse(localStorage.getItem('customPc')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};
            customPc.totalBuildPrice = customPc.totalBuildPrice - priceToDeduct;
            customPc.totalActualPrice = customPc.totalActualPrice - actualPriceToDeduct;
            localStorage.setItem("customPc",JSON.stringify(customPc))
        }
    }
})

export const {addCpu, addGpu, addHdd, addPsu, addSsd, addCoolingSystem, addMotherboard, addCabinet, addMonitor, addRam, addHeadphone, addKeyboard, addMouse, addMousepad, clearAllBuild, deleteCurrentSelection, deleteCurrentPriceFromTotalPrice} = pcBuilderSlice.actions;

export default pcBuilderSlice.reducer;