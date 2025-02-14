import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0}; 



const pcConfigure = createSlice({
    name: 'PcConfigure',
    initialState,
    reducers: {
        addConfigureCpu: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentActualPrice = state.totalActualPrice;
            if(Object.keys(state.cpu).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.cpu.price *state.cpu.qty)
                currentActualPrice = currentActualPrice -(state.cpu.currentPrice *state.cpu.qty)
            }
            const cpu = action.payload;
            state.cpu = cpu;
            state.totalBuildPrice = currentBuildPrice + (cpu.price * cpu.qty);
           state.totalActualPrice = currentActualPrice + (cpu.currentPrice * cpu.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            PcConfigure.cpu = cpu;
            PcConfigure.totalBuildPrice = currentBuildPrice + (cpu.price * cpu.qty);
            PcConfigure.totalActualPrice = currentActualPrice + (cpu.currentPrice * cpu.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureMotherboard: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentActualPrice = state.totalActualPrice;
            if(Object.keys(state.motherboard).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.motherboard.price *state.motherboard.qty);
                currentActualPrice = currentActualPrice -(state.motherboard.currentPrice *state.motherboard.qty)
            }
            const motherboard = action.payload;
            state.motherboard = motherboard;
            state.totalBuildPrice = currentBuildPrice + (motherboard.price * motherboard.qty);
           state.totalActualPrice = currentActualPrice + (motherboard.currentPrice * motherboard.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            PcConfigure.motherboard = motherboard;
            PcConfigure.totalBuildPrice = currentBuildPrice + (motherboard.price * motherboard.qty);
            PcConfigure.totalActualPrice = currentActualPrice + (motherboard.currentPrice * motherboard.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureCoolingSystem: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentActualPrice = state.totalActualPrice;
            if(Object.keys(state.coolingSystem).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.coolingSystem.price *state.coolingSystem.qty);
                currentActualPrice = currentActualPrice -(state.coolingSystem.currentPrice *state.coolingSystem.qty);
            }
            const coolingSystem = action.payload;
            state.coolingSystem = coolingSystem;
            state.totalBuildPrice = currentBuildPrice + (coolingSystem.price * coolingSystem.qty);
           state.totalActualPrice = currentActualPrice + (coolingSystem.currentPrice * coolingSystem.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            PcConfigure.coolingSystem = coolingSystem
            PcConfigure.totalBuildPrice = currentBuildPrice + (coolingSystem.price * coolingSystem.qty);
            PcConfigure.totalActualPrice = currentActualPrice + (coolingSystem.currentPrice * coolingSystem.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureRam: (state, action) => {
            let currentActualPrice = state.totalActualPrice;
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.ram).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.ram.price *state.ram.qty);
                currentActualPrice = currentActualPrice -(state.ram.currentPrice *state.ram.qty);
            }
            const ram = action.payload;
            state.ram = ram;
            state.totalBuildPrice = currentBuildPrice + (ram.price * ram.qty);
           state.totalActualPrice = currentActualPrice + (ram.currentPrice * ram.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            PcConfigure.ram = ram;
            PcConfigure.totalBuildPrice = currentBuildPrice + (ram.price * ram.qty);
            PcConfigure.totalActualPrice = currentActualPrice + (ram.currentPrice * ram.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureSsd: (state, action) => {
            let currentActualPrice = state.totalActualPrice;
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.ssd).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.ssd.price *state.ssd.qty);
                currentActualPrice = currentActualPrice -(state.ssd.currentPrice *state.ssd.qty);
            }
            const ssd = action.payload;
            state.ssd = ssd;
            state.totalBuildPrice = currentBuildPrice + (ssd.price * ssd.qty);
           state.totalActualPrice = currentActualPrice + (ssd.currentPrice * ssd.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            PcConfigure.ssd = ssd;
            PcConfigure.totalBuildPrice = currentBuildPrice + (ssd.price * ssd.qty);
            PcConfigure.totalActualPrice = currentActualPrice + (ssd.currentPrice * ssd.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureHdd: (state, action) => {
            let currentActualPrice = state.totalActualPrice;
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.hdd).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.hdd.price *state.hdd.qty);
                currentActualPrice = currentActualPrice -(state.hdd.currentPrice *state.hdd.qty);
            }
            const hdd = action.payload;
            state.hdd = hdd;
            state.totalBuildPrice = currentBuildPrice + (hdd.price * hdd.qty);
           state.totalActualPrice = currentActualPrice + (hdd.currentPrice * hdd.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            PcConfigure.hdd = hdd;
            PcConfigure.totalBuildPrice = currentBuildPrice + (hdd.price * hdd.qty);
            PcConfigure.totalActualPrice = currentActualPrice + (hdd.currentPrice * hdd.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureGpu: (state, action) => {
            let currentActualPrice = state.totalActualPrice;
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.gpu).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.gpu.price *state.gpu.qty);
                currentActualPrice = currentActualPrice -(state.gpu.currentPrice *state.gpu.qty);
            }
            const gpu = action.payload;
            state.gpu = gpu;
            state.totalBuildPrice = currentBuildPrice + (gpu.price * gpu.qty);
           state.totalActualPrice = currentActualPrice + (gpu.currentPrice * gpu.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            PcConfigure.gpu = gpu;
            PcConfigure.totalBuildPrice = currentBuildPrice + (gpu.price * gpu.qty);
            PcConfigure.totalActualPrice = currentActualPrice + (gpu.currentPrice * gpu.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigurePsu: (state, action) => {
            let currentActualPrice = state.totalActualPrice;
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.psu).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.psu.price *state.psu.qty);
                currentActualPrice = currentActualPrice -(state.psu.currentPrice *state.psu.qty);
            }
            const psu = action.payload;
            state.psu = psu;
            state.totalBuildPrice = currentBuildPrice + (psu.price * psu.qty);
           state.totalActualPrice = currentActualPrice + (psu.currentPrice * psu.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            PcConfigure.psu = psu;
            PcConfigure.totalBuildPrice = currentBuildPrice + (psu.price * psu.qty);
            PcConfigure.totalActualPrice = currentActualPrice + (psu.currentPrice * psu.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureMonitor: (state, action) => {
            let currentActualPrice = state.totalActualPrice;
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.monitor).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.monitor.price *state.monitor.qty);
                currentActualPrice = currentActualPrice -(state.monitor.currentPrice *state.monitor.qty);
            }
            const monitor = action.payload;
            state.monitor = monitor;
            state.totalBuildPrice = currentBuildPrice + (monitor.price * monitor.qty);
           state.totalActualPrice = currentActualPrice + (monitor.currentPrice * monitor.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            PcConfigure.monitor = monitor;
            PcConfigure.totalBuildPrice = currentBuildPrice + (monitor.price * monitor.qty);
            PcConfigure.totalActualPrice = currentActualPrice + (monitor.currentPrice * monitor.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureKeyboard: (state, action) => {
            let currentActualPrice = state.totalActualPrice;
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.keyboard).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.keyboard.price *state.keyboard.qty);
                currentActualPrice = currentActualPrice -(state.keyboard.currentPrice *state.keyboard.qty);
            }
            const keyboard = action.payload;
            state.keyboard = keyboard;
            state.totalBuildPrice = currentBuildPrice + (keyboard.price * keyboard.qty);
           state.totalActualPrice = currentActualPrice + (keyboard.currentPrice * keyboard.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            PcConfigure.keyboard = keyboard;
            PcConfigure.totalBuildPrice = currentBuildPrice + (keyboard.price * keyboard.qty);
            PcConfigure.totalActualPrice = currentActualPrice + (keyboard.currentPrice * keyboard.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureMouse: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentActualPrice = state.totalActualPrice;
            if(Object.keys(state.mouse).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.mouse.price *state.mouse.qty);
                currentActualPrice = currentActualPrice -(state.mouse.currentPrice *state.mouse.qty);
            }
            const mouse = action.payload;
            state.mouse = mouse;
            state.totalBuildPrice = currentBuildPrice + (mouse.price * mouse.qty);
           state.totalActualPrice = currentActualPrice + (mouse.currentPrice * mouse.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            PcConfigure.mouse = mouse;
            PcConfigure.totalBuildPrice = currentBuildPrice + (mouse.price * mouse.qty);
            PcConfigure.totalActualPrice = currentActualPrice + (mouse.currentPrice * mouse.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureMousepad: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            let currentActualPrice = state.totalActualPrice;
            if(Object.keys(state.mousepad).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.mousepad.price *state.mousepad.qty);
                currentActualPrice = currentActualPrice -(state.mousepad.currentPrice *state.mousepad.qty);
            }
            const mousepad = action.payload;
            state.mousepad = mousepad;
            state.totalBuildPrice = currentBuildPrice + (mousepad.price * mousepad.qty);
           state.totalActualPrice = currentActualPrice + (mousepad.currentPrice * mousepad.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            PcConfigure.mousepad = mousepad;
            PcConfigure.totalBuildPrice = currentBuildPrice + (mousepad.price * mousepad.qty);
            PcConfigure.totalActualPrice = currentActualPrice + (mousepad.currentPrice * mousepad.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureHeadphone: (state, action) => {
            let currentActualPrice = state.totalActualPrice;
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.headphone).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.headphone.price *state.headphone.qty);
                currentActualPrice = currentActualPrice -(state.headphone.currentPrice *state.headphone.qty);
            }
            const headphone = action.payload;
            state.headphone = headphone;
            state.totalBuildPrice = currentBuildPrice + (headphone.price * headphone.qty);
           state.totalActualPrice = currentActualPrice + (headphone.currentPrice * headphone.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            PcConfigure.headphone = headphone;
            PcConfigure.totalBuildPrice = currentBuildPrice + (headphone.price * headphone.qty);
            PcConfigure.totalActualPrice = currentActualPrice + (headphone.currentPrice * headphone.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureCabinet: (state, action) => {
            let currentActualPrice = state.totalActualPrice;
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.cabinet).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.cabinet.price *state.cabinet.qty);
                currentActualPrice = currentActualPrice -(state.cabinet.currentPrice *state.cabinet.qty);
            }
            const cabinet = action.payload;
            state.cabinet = cabinet;
            state.totalBuildPrice = currentBuildPrice + (cabinet.price * cabinet.qty);
           state.totalActualPrice = currentActualPrice + (cabinet.currentPrice * cabinet.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            PcConfigure.cabinet = cabinet;
            PcConfigure.totalBuildPrice = currentBuildPrice + (cabinet.price * cabinet.qty);
            PcConfigure.totalActualPrice = currentActualPrice + (cabinet.currentPrice * cabinet.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        clearAllBuild: (state, action) => {
            const PcConfigure = {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};

            localStorage.setItem('PcConfigure', JSON.stringify(PcConfigure));
            return PcConfigure; 
        },
        deleteCurrentSelection: (state, action) => {
            const item = action.payload;
            state.totalBuildPrice = state.totalBuildPrice - (state[item].price * state[item].qty)
            state.totalActualPrice = state.totalActualPrice - (state[item].currentPrice * state[item].qty)
            state[item] = {}
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};
            PcConfigure.totalBuildPrice = PcConfigure.totalBuildPrice - (PcConfigure[item].price * PcConfigure[item].qty)
            PcConfigure.totalActualPrice = PcConfigure.totalActualPrice - (PcConfigure[item].currentPrice * PcConfigure[item].qty)
            PcConfigure[item] = {};
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        deleteCurrentPriceFromTotalPrice : (state, action) => {
            console.log(action.payload);
            const priceToDeduct = state[action.payload].price * state[action.payload].qty;
            const actualPriceToDeduct = state[action.payload].currentPrice * state[action.payload].qty;
            state.totalBuildPrice = state.totalBuildPrice - priceToDeduct;
            state.totalActualPrice = state.totalActualPrice - actualPriceToDeduct;
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0, totalActualPrice: 0};
            PcConfigure.totalBuildPrice = PcConfigure.totalBuildPrice - priceToDeduct;
            PcConfigure.totalActualPrice = PcConfigure.totalActualPrice - actualPriceToDeduct;
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        }
    }
})

export const {addConfigureCpu, addConfigureGpu, addConfigureHdd, addConfigurePsu, addConfigureSsd, addConfigureCoolingSystem, addConfigureMotherboard, addConfigureCabinet, addConfigureMonitor, addConfigureRam, addConfigureHeadphone, addConfigureKeyboard, addConfigureMouse, addConfigureMousepad, clearAllBuild, deleteCurrentSelection, deleteCurrentPriceFromTotalPrice} = pcConfigure.actions;

export default pcConfigure.reducer;