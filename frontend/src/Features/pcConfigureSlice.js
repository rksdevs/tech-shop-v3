import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0}; 



const pcConfigure = createSlice({
    name: 'PcConfigure',
    initialState,
    reducers: {
        addConfigureCpu: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.cpu).length > 0) {
                console.log(currentBuildPrice, "1")
                currentBuildPrice = currentBuildPrice -(state.cpu.price *state.cpu.qty) 
                console.log(currentBuildPrice, "2")
            }
            const cpu = action.payload;
            state.cpu = cpu;
            state.totalBuildPrice = currentBuildPrice + (cpu.price * cpu.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            PcConfigure.cpu = cpu;
            PcConfigure.totalBuildPrice = currentBuildPrice + (cpu.price * cpu.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureMotherboard: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.motherboard).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.motherboard.price *state.motherboard.qty);
            }
            const motherboard = action.payload;
            state.motherboard = motherboard;
            state.totalBuildPrice = currentBuildPrice + (motherboard.price * motherboard.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            PcConfigure.motherboard = motherboard;
            PcConfigure.totalBuildPrice = currentBuildPrice + (motherboard.price * motherboard.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureCoolingSystem: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.coolingSystem).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.coolingSystem.price *state.coolingSystem.qty);
            }
            const coolingSystem = action.payload;
            state.coolingSystem = coolingSystem;
            state.totalBuildPrice = currentBuildPrice + (coolingSystem.price * coolingSystem.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            PcConfigure.coolingSystem = coolingSystem
            PcConfigure.totalBuildPrice = currentBuildPrice + (coolingSystem.price * coolingSystem.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureRam: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.ram).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.ram.price *state.ram.qty);
            }
            const ram = action.payload;
            state.ram = ram;
            state.totalBuildPrice = currentBuildPrice + (ram.price * ram.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            PcConfigure.ram = ram;
            PcConfigure.totalBuildPrice = currentBuildPrice + (ram.price * ram.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureSsd: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.ssd).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.ssd.price *state.ssd.qty);
            }
            const ssd = action.payload;
            state.ssd = ssd;
            state.totalBuildPrice = currentBuildPrice + (ssd.price * ssd.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            PcConfigure.ssd = ssd;
            PcConfigure.totalBuildPrice = currentBuildPrice + (ssd.price * ssd.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureHdd: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.hdd).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.hdd.price *state.hdd.qty);
            }
            const hdd = action.payload;
            state.hdd = hdd;
            state.totalBuildPrice = currentBuildPrice + (hdd.price * hdd.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            PcConfigure.hdd = hdd;
            PcConfigure.totalBuildPrice = currentBuildPrice + (hdd.price * hdd.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureGpu: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.gpu).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.gpu.price *state.gpu.qty);
            }
            const gpu = action.payload;
            state.gpu = gpu;
            state.totalBuildPrice = currentBuildPrice + (gpu.price * gpu.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            PcConfigure.gpu = gpu;
            PcConfigure.totalBuildPrice = currentBuildPrice + (gpu.price * gpu.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigurePsu: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.psu).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.psu.price *state.psu.qty);
            }
            const psu = action.payload;
            state.psu = psu;
            state.totalBuildPrice = currentBuildPrice + (psu.price * psu.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            PcConfigure.psu = psu;
            PcConfigure.totalBuildPrice = currentBuildPrice + (psu.price * psu.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureMonitor: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.monitor).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.monitor.price *state.monitor.qty);
            }
            const monitor = action.payload;
            state.monitor = monitor;
            state.totalBuildPrice = currentBuildPrice + (monitor.price * monitor.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            PcConfigure.monitor = monitor;
            PcConfigure.totalBuildPrice = currentBuildPrice + (monitor.price * monitor.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureKeyboard: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.keyboard).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.keyboard.price *state.keyboard.qty);
            }
            const keyboard = action.payload;
            state.keyboard = keyboard;
            state.totalBuildPrice = currentBuildPrice + (keyboard.price * keyboard.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            PcConfigure.keyboard = keyboard;
            PcConfigure.totalBuildPrice = currentBuildPrice + (keyboard.price * keyboard.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureMouse: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.mouse).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.mouse.price *state.mouse.qty);
            }
            const mouse = action.payload;
            state.mouse = mouse;
            state.totalBuildPrice = currentBuildPrice + (mouse.price * mouse.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            PcConfigure.mouse = mouse;
            PcConfigure.totalBuildPrice = currentBuildPrice + (mouse.price * mouse.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureMousepad: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.mousepad).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.mousepad.price *state.mousepad.qty);
            }
            const mousepad = action.payload;
            state.mousepad = mousepad;
            state.totalBuildPrice = currentBuildPrice + (mousepad.price * mousepad.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            PcConfigure.mousepad = mousepad;
            PcConfigure.totalBuildPrice = currentBuildPrice + (mousepad.price * mousepad.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureHeadphone: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.headphone).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.headphone.price *state.headphone.qty);
            }
            const headphone = action.payload;
            state.headphone = headphone;
            state.totalBuildPrice = currentBuildPrice + (headphone.price * headphone.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            PcConfigure.headphone = headphone;
            PcConfigure.totalBuildPrice = currentBuildPrice + (headphone.price * headphone.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        addConfigureCabinet: (state, action) => {
            let currentBuildPrice = state.totalBuildPrice;
            if(Object.keys(state.cabinet).length > 0) {
                currentBuildPrice = currentBuildPrice -(state.cabinet.price *state.cabinet.qty);
            }
            const cabinet = action.payload;
            state.cabinet = cabinet;
            state.totalBuildPrice = currentBuildPrice + (cabinet.price * cabinet.qty);
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            PcConfigure.cabinet = cabinet;
            PcConfigure.totalBuildPrice = currentBuildPrice + (cabinet.price * cabinet.qty);
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        clearAllBuild: (state, action) => {
            const PcConfigure = {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};

            localStorage.setItem('PcConfigure', JSON.stringify(PcConfigure));
            return PcConfigure; 
        },
        deleteCurrentSelection: (state, action) => {
            const item = action.payload;
            state.totalBuildPrice = state.totalBuildPrice - (state[item].price * state[item].qty)
            state[item] = {}
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};
            PcConfigure.totalBuildPrice = PcConfigure.totalBuildPrice - (PcConfigure[item].price * PcConfigure[item].qty)
            PcConfigure[item] = {};
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        },
        deleteCurrentPriceFromTotalPrice : (state, action) => {
            console.log(action.payload);
            const priceToDeduct = state[action.payload].price * state[action.payload].qty;
            state.totalBuildPrice = state.totalBuildPrice - priceToDeduct;
            const PcConfigure = localStorage.getItem('PcConfigure') ? JSON.parse(localStorage.getItem('PcConfigure')) : {cpu:{}, motherboard: {}, coolingSystem: {}, ram:{}, ssd:{}, hdd:{}, gpu:{}, psu:{}, monitor: {}, keyboard:{}, mouse:{}, mousepad:{}, headphone:{}, cabinet:{}, totalBuildPrice: 0};
            PcConfigure.totalBuildPrice = PcConfigure.totalBuildPrice - priceToDeduct;
            localStorage.setItem("PcConfigure",JSON.stringify(PcConfigure))
        }
    }
})

export const {addConfigureCpu, addConfigureGpu, addConfigureHdd, addConfigurePsu, addConfigureSsd, addConfigureCoolingSystem, addConfigureMotherboard, addConfigureCabinet, addConfigureMonitor, addConfigureRam, addConfigureHeadphone, addConfigureKeyboard, addConfigureMouse, addConfigureMousepad, clearAllBuild, deleteCurrentSelection, deleteCurrentPriceFromTotalPrice} = pcConfigure.actions;

export default pcConfigure.reducer;