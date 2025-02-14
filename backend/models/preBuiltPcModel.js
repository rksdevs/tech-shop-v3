import mongoose, { Schema } from "mongoose";

const preBuiltPcScehma = new mongoose.Schema({
    pcName: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    pcCategory: {
        type: String,
        required: true
    },
    pcUses: {
        type: String,
        required: true
    },
    pcImage: {
        type: String,
        required: true
    },
    pcComponents: {
        cpu: {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                
                ref: "User",
            },
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',  
            },
            name: {
                type: String,
                
            },
            image: {
                type: String,
                
            },
            sku: {
                type: String,
                
            },
            brand: {
                type: String,
                
            },
            category: {
                type: String,
                
            },
            description: {
                type: String,
                
            },
            rating: {
                type: Number,
                
                default: 0
            },
            numReviews: {
                type: Number,
                
                default: 0
            },
            price: {
                type: Number,
                
                default: 0
            },
            countInStock: {
                type: Number,
                
                default: 0
            },
            productDiscount: {
                type: Number,
                
                default: 0
            },
            
            isOnOffer: {
                type: Boolean,
                
                default: false
            },
            offerName: {
                type: String,
            },
            compatibilityDetails: {
                socketType: {type:String},
                powerConsumption: {type:String},
                chipsetModel: {type:String},
                formFactor: {type:String},
                memorySlots: {type:String},
                expansionSlots: {type:String},
                storageInterface: {type:String},
                ramType: {type:String},
                ramFormFactor: {type:String, enum:['Desktop', 'Laptop', 'NA'], default: 'NA'},
                wattage: {type:String},
                networkCardInterfaces: {type:String}
            },
            warrantyDetails: {
                warrantyPeriod: {type: String, default: "1"},
                returnPeriod: {type: String, default: "7"}
            },
            featureDetails: {
                featureOne: {type: String},
                featureTwo: {type: String},
                featureThree: {type: String},
                featureFour: {type: String},
                featureFive: {type: String},
                featureSix: {type: String},
                featureSeven: {type: String},
                featureEight: {type: String},
                featureNine: {type: String},
                featureTen: {type: String},
            },
            specificationDetails: {
                modelNumber: {type:String},
                gpuChipset: {type:String},
                gpuModel: {type:String},
                pciExpress: {type:String},
                gpuBaseClock: {type:String},
                gpuBoostClock: {
                    type: [String]
                },
                gpuMemoryClock: {type:String},
                gpuMemorySize: {type:String},
                gpuMemoryInterface: {type:String},
                gpuMemoryType: {type:String},
                gpuDirectX: {type:String},
                gpuOpenGl: {type:String},
                gpuResolution: {type:String},
                gpuPorts: {
                    type: [String]
                },
                gpuPowerConnectors: {type:String},
                gpuCudaCores: {type:String},
                wattage: {type:String},
                networkCardInterfaces: {type:String},
                cpuModel: {type:String},
                cpuChipset: {type:String},
                cpuCores: {type:String},
                cpuThreads: {type:String},
                cpuBaseFrequency: {type:String},
                cpuMaxTurboFrequency: {type:String},
                cpuCache: {type:String},
                cpuBusSpeed: {type:String},
                cpuTDP: {type:String},
                cpuProcessorGraphics: {type:String},
                cpuSupportSockets: {type:String},
                moboCpu: {type:String},
                moboChipset: {type:String},
                moboMemory: {type:String},
                moboGraphics: {type:String},
                moboEthernet: {type:String},
                moboAudio: {type:String},
                moboExpansionSlots: {
                    type: [String]
                },
                moboStorage: {
                    type: [String]
                },
                moboUSB: {
                    type: [String]
                },
                moboBackPanelIO: {
                    type: [String]
                },
                moboInternalIO: {
                    type: [String]
                },
                moboBIOS: {type:String},
                moboFormFactor:{type:String},
                moboOS: {type:String},
                RAMModel: {type:String},
                RAMMemorySeries: {type:String},
                RAMMemoryType: {type:String},
                RAMCapacity: {type:String},
                RAMKitType: {type:String},
                RAMSpeed: {type:String},
                coolerModelNumber: {type:String},
                coolerWaterBlock: {type:String},
                coolerFan: {type:String},
                coolerRadiator: {type:String},
                coolerPump: {type:String},
                coolerSockets: {type:String},
                coolerNoise: {type:String},
                coolerDimensions: {type:String},
                psuModelNumber: {type:String},
                psuFormFactor: {type:String},
                psuDimensions: {type:String},
                psuInputRange: {type:String},
                psuTotalOutput: {type:String},
                psuConnectors: {
                    type: [String]
                },
                psuPackageContents: {
                    type: [String]
                },
                psuEfficiency: {type:String},
                cabinetModelNumber: {type:String},
                cabinetChassis: {type:String},
                cabinetFormFactor: {type:String},
                cabinetPreinstalledFans: {type:String},
                cabinetDriveBays: {type:String},
                cabinetFanSupport: {
                    type: [String]
                },
                cabinetLiquidCooling: {
                    type: [String]
                },
                cabinetIOPanel: {type:String},
                memoryModelNumber: {type:String},
                memoryFormFactor: {type:String},
                memoryInterface: {type:String},
                memoryCapacity: {type:String},
                memorySpeed: {type:String},
                memoryDimensions: {type:String},
            },
            currentPrice: {
                type: Number,
            }
        },
        motherboard: {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                
                ref: "User",
            },
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',  
            },
            currentPrice: {
                type: Number,
            },
            name: {
                type: String,
                
            },
            image: {
                type: String,
                
            },
            sku: {
                type: String,
                
            },
            brand: {
                type: String,
                
            },
            category: {
                type: String,
                
            },
            description: {
                type: String,
                
            },
            
            rating: {
                type: Number,
                
                default: 0
            },
            numReviews: {
                type: Number,
                
                default: 0
            },
            price: {
                type: Number,
                
                default: 0
            },
            countInStock: {
                type: Number,
                
                default: 0
            },
            productDiscount: {
                type: Number,
                
                default: 0
            },
            
            isOnOffer: {
                type: Boolean,
                
                default: false
            },
            offerName: {
                type: String,
            },
            compatibilityDetails: {
                socketType: {type:String},
                powerConsumption: {type:String},
                chipsetModel: {type:String},
                formFactor: {type:String},
                memorySlots: {type:String},
                expansionSlots: {type:String},
                storageInterface: {type:String},
                ramType: {type:String},
                ramFormFactor: {type:String, enum:['Desktop', 'Laptop', 'NA'], default: 'NA'},
                wattage: {type:String},
                networkCardInterfaces: {type:String}
            },
            warrantyDetails: {
                warrantyPeriod: {type: String, default: "1"},
                returnPeriod: {type: String, default: "7"}
            },
            featureDetails: {
                featureOne: {type: String},
                featureTwo: {type: String},
                featureThree: {type: String},
                featureFour: {type: String},
                featureFive: {type: String},
                featureSix: {type: String},
                featureSeven: {type: String},
                featureEight: {type: String},
                featureNine: {type: String},
                featureTen: {type: String},
            },
            specificationDetails: {
                modelNumber: {type:String},
                gpuChipset: {type:String},
                gpuModel: {type:String},
                pciExpress: {type:String},
                gpuBaseClock: {type:String},
                gpuBoostClock: {
                    type: [String]
                },
                gpuMemoryClock: {type:String},
                gpuMemorySize: {type:String},
                gpuMemoryInterface: {type:String},
                gpuMemoryType: {type:String},
                gpuDirectX: {type:String},
                gpuOpenGl: {type:String},
                gpuResolution: {type:String},
                gpuPorts: {
                    type: [String]
                },
                gpuPowerConnectors: {type:String},
                gpuCudaCores: {type:String},
                wattage: {type:String},
                networkCardInterfaces: {type:String},
                cpuModel: {type:String},
                cpuChipset: {type:String},
                cpuCores: {type:String},
                cpuThreads: {type:String},
                cpuBaseFrequency: {type:String},
                cpuMaxTurboFrequency: {type:String},
                cpuCache: {type:String},
                cpuBusSpeed: {type:String},
                cpuTDP: {type:String},
                cpuProcessorGraphics: {type:String},
                cpuSupportSockets: {type:String},
                moboCpu: {type:String},
                moboChipset: {type:String},
                moboMemory: {type:String},
                moboGraphics: {type:String},
                moboEthernet: {type:String},
                moboAudio: {type:String},
                moboExpansionSlots: {
                    type: [String]
                },
                moboStorage: {
                    type: [String]
                },
                moboUSB: {
                    type: [String]
                },
                moboBackPanelIO: {
                    type: [String]
                },
                moboInternalIO: {
                    type: [String]
                },
                moboBIOS: {type:String},
                moboFormFactor:{type:String},
                moboOS: {type:String},
                RAMModel: {type:String},
                RAMMemorySeries: {type:String},
                RAMMemoryType: {type:String},
                RAMCapacity: {type:String},
                RAMKitType: {type:String},
                RAMSpeed: {type:String},
                coolerModelNumber: {type:String},
                coolerWaterBlock: {type:String},
                coolerFan: {type:String},
                coolerRadiator: {type:String},
                coolerPump: {type:String},
                coolerSockets: {type:String},
                coolerNoise: {type:String},
                coolerDimensions: {type:String},
                psuModelNumber: {type:String},
                psuFormFactor: {type:String},
                psuDimensions: {type:String},
                psuInputRange: {type:String},
                psuTotalOutput: {type:String},
                psuConnectors: {
                    type: [String]
                },
                psuPackageContents: {
                    type: [String]
                },
                psuEfficiency: {type:String},
                cabinetModelNumber: {type:String},
                cabinetChassis: {type:String},
                cabinetFormFactor: {type:String},
                cabinetPreinstalledFans: {type:String},
                cabinetDriveBays: {type:String},
                cabinetFanSupport: {
                    type: [String]
                },
                cabinetLiquidCooling: {
                    type: [String]
                },
                cabinetIOPanel: {type:String},
                memoryModelNumber: {type:String},
                memoryFormFactor: {type:String},
                memoryInterface: {type:String},
                memoryCapacity: {type:String},
                memorySpeed: {type:String},
                memoryDimensions: {type:String},
            }
        },
        gpu: {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                
                ref: "User",
            },
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',  
            },
            currentPrice: {
                type: Number,
            },
            name: {
                type: String,
                
            },
            image: {
                type: String,
                
            },
            sku: {
                type: String,
                
            },
            brand: {
                type: String,
                
            },
            category: {
                type: String,
                
            },
            description: {
                type: String,
                
            },
            
            rating: {
                type: Number,
                
                default: 0
            },
            numReviews: {
                type: Number,
                
                default: 0
            },
            price: {
                type: Number,
                
                default: 0
            },
            countInStock: {
                type: Number,
                
                default: 0
            },
            productDiscount: {
                type: Number,
                
                default: 0
            },
            
            isOnOffer: {
                type: Boolean,
                
                default: false
            },
            offerName: {
                type: String,
            },
            compatibilityDetails: {
                socketType: {type:String},
                powerConsumption: {type:String},
                chipsetModel: {type:String},
                formFactor: {type:String},
                memorySlots: {type:String},
                expansionSlots: {type:String},
                storageInterface: {type:String},
                ramType: {type:String},
                ramFormFactor: {type:String, enum:['Desktop', 'Laptop', 'NA'], default: 'NA'},
                wattage: {type:String},
                networkCardInterfaces: {type:String}
            },
            warrantyDetails: {
                warrantyPeriod: {type: String, default: "1"},
                returnPeriod: {type: String, default: "7"}
            },
            featureDetails: {
                featureOne: {type: String},
                featureTwo: {type: String},
                featureThree: {type: String},
                featureFour: {type: String},
                featureFive: {type: String},
                featureSix: {type: String},
                featureSeven: {type: String},
                featureEight: {type: String},
                featureNine: {type: String},
                featureTen: {type: String},
            },
            specificationDetails: {
                modelNumber: {type:String},
                gpuChipset: {type:String},
                gpuModel: {type:String},
                pciExpress: {type:String},
                gpuBaseClock: {type:String},
                gpuBoostClock: {
                    type: [String]
                },
                gpuMemoryClock: {type:String},
                gpuMemorySize: {type:String},
                gpuMemoryInterface: {type:String},
                gpuMemoryType: {type:String},
                gpuDirectX: {type:String},
                gpuOpenGl: {type:String},
                gpuResolution: {type:String},
                gpuPorts: {
                    type: [String]
                },
                gpuPowerConnectors: {type:String},
                gpuCudaCores: {type:String},
                wattage: {type:String},
                networkCardInterfaces: {type:String},
                cpuModel: {type:String},
                cpuChipset: {type:String},
                cpuCores: {type:String},
                cpuThreads: {type:String},
                cpuBaseFrequency: {type:String},
                cpuMaxTurboFrequency: {type:String},
                cpuCache: {type:String},
                cpuBusSpeed: {type:String},
                cpuTDP: {type:String},
                cpuProcessorGraphics: {type:String},
                cpuSupportSockets: {type:String},
                moboCpu: {type:String},
                moboChipset: {type:String},
                moboMemory: {type:String},
                moboGraphics: {type:String},
                moboEthernet: {type:String},
                moboAudio: {type:String},
                moboExpansionSlots: {
                    type: [String]
                },
                moboStorage: {
                    type: [String]
                },
                moboUSB: {
                    type: [String]
                },
                moboBackPanelIO: {
                    type: [String]
                },
                moboInternalIO: {
                    type: [String]
                },
                moboBIOS: {type:String},
                moboFormFactor:{type:String},
                moboOS: {type:String},
                RAMModel: {type:String},
                RAMMemorySeries: {type:String},
                RAMMemoryType: {type:String},
                RAMCapacity: {type:String},
                RAMKitType: {type:String},
                RAMSpeed: {type:String},
                coolerModelNumber: {type:String},
                coolerWaterBlock: {type:String},
                coolerFan: {type:String},
                coolerRadiator: {type:String},
                coolerPump: {type:String},
                coolerSockets: {type:String},
                coolerNoise: {type:String},
                coolerDimensions: {type:String},
                psuModelNumber: {type:String},
                psuFormFactor: {type:String},
                psuDimensions: {type:String},
                psuInputRange: {type:String},
                psuTotalOutput: {type:String},
                psuConnectors: {
                    type: [String]
                },
                psuPackageContents: {
                    type: [String]
                },
                psuEfficiency: {type:String},
                cabinetModelNumber: {type:String},
                cabinetChassis: {type:String},
                cabinetFormFactor: {type:String},
                cabinetPreinstalledFans: {type:String},
                cabinetDriveBays: {type:String},
                cabinetFanSupport: {
                    type: [String]
                },
                cabinetLiquidCooling: {
                    type: [String]
                },
                cabinetIOPanel: {type:String},
                memoryModelNumber: {type:String},
                memoryFormFactor: {type:String},
                memoryInterface: {type:String},
                memoryCapacity: {type:String},
                memorySpeed: {type:String},
                memoryDimensions: {type:String},
            }
        },
        ram: {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                
                ref: "User",
            },
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',  
            },
            currentPrice: {
                type: Number,
            },
            name: {
                type: String,
                
            },
            image: {
                type: String,
                
            },
            sku: {
                type: String,
                
            },
            brand: {
                type: String,
                
            },
            category: {
                type: String,
                
            },
            description: {
                type: String,
                
            },
            
            rating: {
                type: Number,
                
                default: 0
            },
            numReviews: {
                type: Number,
                
                default: 0
            },
            price: {
                type: Number,
                
                default: 0
            },
            countInStock: {
                type: Number,
                
                default: 0
            },
            productDiscount: {
                type: Number,
                
                default: 0
            },
            
            isOnOffer: {
                type: Boolean,
                
                default: false
            },
            offerName: {
                type: String,
            },
            compatibilityDetails: {
                socketType: {type:String},
                powerConsumption: {type:String},
                chipsetModel: {type:String},
                formFactor: {type:String},
                memorySlots: {type:String},
                expansionSlots: {type:String},
                storageInterface: {type:String},
                ramType: {type:String},
                ramFormFactor: {type:String, enum:['Desktop', 'Laptop', 'NA'], default: 'NA'},
                wattage: {type:String},
                networkCardInterfaces: {type:String}
            },
            warrantyDetails: {
                warrantyPeriod: {type: String, default: "1"},
                returnPeriod: {type: String, default: "7"}
            },
            featureDetails: {
                featureOne: {type: String},
                featureTwo: {type: String},
                featureThree: {type: String},
                featureFour: {type: String},
                featureFive: {type: String},
                featureSix: {type: String},
                featureSeven: {type: String},
                featureEight: {type: String},
                featureNine: {type: String},
                featureTen: {type: String},
            },
            specificationDetails: {
                modelNumber: {type:String},
                gpuChipset: {type:String},
                gpuModel: {type:String},
                pciExpress: {type:String},
                gpuBaseClock: {type:String},
                gpuBoostClock: {
                    type: [String]
                },
                gpuMemoryClock: {type:String},
                gpuMemorySize: {type:String},
                gpuMemoryInterface: {type:String},
                gpuMemoryType: {type:String},
                gpuDirectX: {type:String},
                gpuOpenGl: {type:String},
                gpuResolution: {type:String},
                gpuPorts: {
                    type: [String]
                },
                gpuPowerConnectors: {type:String},
                gpuCudaCores: {type:String},
                wattage: {type:String},
                networkCardInterfaces: {type:String},
                cpuModel: {type:String},
                cpuChipset: {type:String},
                cpuCores: {type:String},
                cpuThreads: {type:String},
                cpuBaseFrequency: {type:String},
                cpuMaxTurboFrequency: {type:String},
                cpuCache: {type:String},
                cpuBusSpeed: {type:String},
                cpuTDP: {type:String},
                cpuProcessorGraphics: {type:String},
                cpuSupportSockets: {type:String},
                moboCpu: {type:String},
                moboChipset: {type:String},
                moboMemory: {type:String},
                moboGraphics: {type:String},
                moboEthernet: {type:String},
                moboAudio: {type:String},
                moboExpansionSlots: {
                    type: [String]
                },
                moboStorage: {
                    type: [String]
                },
                moboUSB: {
                    type: [String]
                },
                moboBackPanelIO: {
                    type: [String]
                },
                moboInternalIO: {
                    type: [String]
                },
                moboBIOS: {type:String},
                moboFormFactor:{type:String},
                moboOS: {type:String},
                RAMModel: {type:String},
                RAMMemorySeries: {type:String},
                RAMMemoryType: {type:String},
                RAMCapacity: {type:String},
                RAMKitType: {type:String},
                RAMSpeed: {type:String},
                coolerModelNumber: {type:String},
                coolerWaterBlock: {type:String},
                coolerFan: {type:String},
                coolerRadiator: {type:String},
                coolerPump: {type:String},
                coolerSockets: {type:String},
                coolerNoise: {type:String},
                coolerDimensions: {type:String},
                psuModelNumber: {type:String},
                psuFormFactor: {type:String},
                psuDimensions: {type:String},
                psuInputRange: {type:String},
                psuTotalOutput: {type:String},
                psuConnectors: {
                    type: [String]
                },
                psuPackageContents: {
                    type: [String]
                },
                psuEfficiency: {type:String},
                cabinetModelNumber: {type:String},
                cabinetChassis: {type:String},
                cabinetFormFactor: {type:String},
                cabinetPreinstalledFans: {type:String},
                cabinetDriveBays: {type:String},
                cabinetFanSupport: {
                    type: [String]
                },
                cabinetLiquidCooling: {
                    type: [String]
                },
                cabinetIOPanel: {type:String},
                memoryModelNumber: {type:String},
                memoryFormFactor: {type:String},
                memoryInterface: {type:String},
                memoryCapacity: {type:String},
                memorySpeed: {type:String},
                memoryDimensions: {type:String},
            }
        },
        ssd: {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                
                ref: "User",
            },
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',  
            },
            currentPrice: {
                type: Number,
            },
            name: {
                type: String,
                
            },
            image: {
                type: String,
                
            },
            sku: {
                type: String,
                
            },
            brand: {
                type: String,
                
            },
            category: {
                type: String,
                
            },
            description: {
                type: String,
                
            },
            
            rating: {
                type: Number,
                
                default: 0
            },
            numReviews: {
                type: Number,
                
                default: 0
            },
            price: {
                type: Number,
                
                default: 0
            },
            countInStock: {
                type: Number,
                
                default: 0
            },
            productDiscount: {
                type: Number,
                
                default: 0
            },
            
            isOnOffer: {
                type: Boolean,
                
                default: false
            },
            offerName: {
                type: String,
            },
            compatibilityDetails: {
                socketType: {type:String},
                powerConsumption: {type:String},
                chipsetModel: {type:String},
                formFactor: {type:String},
                memorySlots: {type:String},
                expansionSlots: {type:String},
                storageInterface: {type:String},
                ramType: {type:String},
                ramFormFactor: {type:String, enum:['Desktop', 'Laptop', 'NA'], default: 'NA'},
                wattage: {type:String},
                networkCardInterfaces: {type:String}
            },
            warrantyDetails: {
                warrantyPeriod: {type: String, default: "1"},
                returnPeriod: {type: String, default: "7"}
            },
            featureDetails: {
                featureOne: {type: String},
                featureTwo: {type: String},
                featureThree: {type: String},
                featureFour: {type: String},
                featureFive: {type: String},
                featureSix: {type: String},
                featureSeven: {type: String},
                featureEight: {type: String},
                featureNine: {type: String},
                featureTen: {type: String},
            },
            specificationDetails: {
                modelNumber: {type:String},
                gpuChipset: {type:String},
                gpuModel: {type:String},
                pciExpress: {type:String},
                gpuBaseClock: {type:String},
                gpuBoostClock: {
                    type: [String]
                },
                gpuMemoryClock: {type:String},
                gpuMemorySize: {type:String},
                gpuMemoryInterface: {type:String},
                gpuMemoryType: {type:String},
                gpuDirectX: {type:String},
                gpuOpenGl: {type:String},
                gpuResolution: {type:String},
                gpuPorts: {
                    type: [String]
                },
                gpuPowerConnectors: {type:String},
                gpuCudaCores: {type:String},
                wattage: {type:String},
                networkCardInterfaces: {type:String},
                cpuModel: {type:String},
                cpuChipset: {type:String},
                cpuCores: {type:String},
                cpuThreads: {type:String},
                cpuBaseFrequency: {type:String},
                cpuMaxTurboFrequency: {type:String},
                cpuCache: {type:String},
                cpuBusSpeed: {type:String},
                cpuTDP: {type:String},
                cpuProcessorGraphics: {type:String},
                cpuSupportSockets: {type:String},
                moboCpu: {type:String},
                moboChipset: {type:String},
                moboMemory: {type:String},
                moboGraphics: {type:String},
                moboEthernet: {type:String},
                moboAudio: {type:String},
                moboExpansionSlots: {
                    type: [String]
                },
                moboStorage: {
                    type: [String]
                },
                moboUSB: {
                    type: [String]
                },
                moboBackPanelIO: {
                    type: [String]
                },
                moboInternalIO: {
                    type: [String]
                },
                moboBIOS: {type:String},
                moboFormFactor:{type:String},
                moboOS: {type:String},
                RAMModel: {type:String},
                RAMMemorySeries: {type:String},
                RAMMemoryType: {type:String},
                RAMCapacity: {type:String},
                RAMKitType: {type:String},
                RAMSpeed: {type:String},
                coolerModelNumber: {type:String},
                coolerWaterBlock: {type:String},
                coolerFan: {type:String},
                coolerRadiator: {type:String},
                coolerPump: {type:String},
                coolerSockets: {type:String},
                coolerNoise: {type:String},
                coolerDimensions: {type:String},
                psuModelNumber: {type:String},
                psuFormFactor: {type:String},
                psuDimensions: {type:String},
                psuInputRange: {type:String},
                psuTotalOutput: {type:String},
                psuConnectors: {
                    type: [String]
                },
                psuPackageContents: {
                    type: [String]
                },
                psuEfficiency: {type:String},
                cabinetModelNumber: {type:String},
                cabinetChassis: {type:String},
                cabinetFormFactor: {type:String},
                cabinetPreinstalledFans: {type:String},
                cabinetDriveBays: {type:String},
                cabinetFanSupport: {
                    type: [String]
                },
                cabinetLiquidCooling: {
                    type: [String]
                },
                cabinetIOPanel: {type:String},
                memoryModelNumber: {type:String},
                memoryFormFactor: {type:String},
                memoryInterface: {type:String},
                memoryCapacity: {type:String},
                memorySpeed: {type:String},
                memoryDimensions: {type:String},
            }
        },
        hdd: {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                
                ref: "User",
            },
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',  
            },
            currentPrice: {
                type: Number,
            },
            name: {
                type: String,
                
            },
            image: {
                type: String,
                
            },
            sku: {
                type: String,
                
            },
            brand: {
                type: String,
                
            },
            category: {
                type: String,
                
            },
            description: {
                type: String,
                
            },
            
            rating: {
                type: Number,
                
                default: 0
            },
            numReviews: {
                type: Number,
                
                default: 0
            },
            price: {
                type: Number,
                
                default: 0
            },
            countInStock: {
                type: Number,
                
                default: 0
            },
            productDiscount: {
                type: Number,
                
                default: 0
            },
            
            isOnOffer: {
                type: Boolean,
                
                default: false
            },
            offerName: {
                type: String,
            },
            compatibilityDetails: {
                socketType: {type:String},
                powerConsumption: {type:String},
                chipsetModel: {type:String},
                formFactor: {type:String},
                memorySlots: {type:String},
                expansionSlots: {type:String},
                storageInterface: {type:String},
                ramType: {type:String},
                ramFormFactor: {type:String, enum:['Desktop', 'Laptop', 'NA'], default: 'NA'},
                wattage: {type:String},
                networkCardInterfaces: {type:String}
            },
            warrantyDetails: {
                warrantyPeriod: {type: String, default: "1"},
                returnPeriod: {type: String, default: "7"}
            },
            featureDetails: {
                featureOne: {type: String},
                featureTwo: {type: String},
                featureThree: {type: String},
                featureFour: {type: String},
                featureFive: {type: String},
                featureSix: {type: String},
                featureSeven: {type: String},
                featureEight: {type: String},
                featureNine: {type: String},
                featureTen: {type: String},
            },
            specificationDetails: {
                modelNumber: {type:String},
                gpuChipset: {type:String},
                gpuModel: {type:String},
                pciExpress: {type:String},
                gpuBaseClock: {type:String},
                gpuBoostClock: {
                    type: [String]
                },
                gpuMemoryClock: {type:String},
                gpuMemorySize: {type:String},
                gpuMemoryInterface: {type:String},
                gpuMemoryType: {type:String},
                gpuDirectX: {type:String},
                gpuOpenGl: {type:String},
                gpuResolution: {type:String},
                gpuPorts: {
                    type: [String]
                },
                gpuPowerConnectors: {type:String},
                gpuCudaCores: {type:String},
                wattage: {type:String},
                networkCardInterfaces: {type:String},
                cpuModel: {type:String},
                cpuChipset: {type:String},
                cpuCores: {type:String},
                cpuThreads: {type:String},
                cpuBaseFrequency: {type:String},
                cpuMaxTurboFrequency: {type:String},
                cpuCache: {type:String},
                cpuBusSpeed: {type:String},
                cpuTDP: {type:String},
                cpuProcessorGraphics: {type:String},
                cpuSupportSockets: {type:String},
                moboCpu: {type:String},
                moboChipset: {type:String},
                moboMemory: {type:String},
                moboGraphics: {type:String},
                moboEthernet: {type:String},
                moboAudio: {type:String},
                moboExpansionSlots: {
                    type: [String]
                },
                moboStorage: {
                    type: [String]
                },
                moboUSB: {
                    type: [String]
                },
                moboBackPanelIO: {
                    type: [String]
                },
                moboInternalIO: {
                    type: [String]
                },
                moboBIOS: {type:String},
                moboFormFactor:{type:String},
                moboOS: {type:String},
                RAMModel: {type:String},
                RAMMemorySeries: {type:String},
                RAMMemoryType: {type:String},
                RAMCapacity: {type:String},
                RAMKitType: {type:String},
                RAMSpeed: {type:String},
                coolerModelNumber: {type:String},
                coolerWaterBlock: {type:String},
                coolerFan: {type:String},
                coolerRadiator: {type:String},
                coolerPump: {type:String},
                coolerSockets: {type:String},
                coolerNoise: {type:String},
                coolerDimensions: {type:String},
                psuModelNumber: {type:String},
                psuFormFactor: {type:String},
                psuDimensions: {type:String},
                psuInputRange: {type:String},
                psuTotalOutput: {type:String},
                psuConnectors: {
                    type: [String]
                },
                psuPackageContents: {
                    type: [String]
                },
                psuEfficiency: {type:String},
                cabinetModelNumber: {type:String},
                cabinetChassis: {type:String},
                cabinetFormFactor: {type:String},
                cabinetPreinstalledFans: {type:String},
                cabinetDriveBays: {type:String},
                cabinetFanSupport: {
                    type: [String]
                },
                cabinetLiquidCooling: {
                    type: [String]
                },
                cabinetIOPanel: {type:String},
                memoryModelNumber: {type:String},
                memoryFormFactor: {type:String},
                memoryInterface: {type:String},
                memoryCapacity: {type:String},
                memorySpeed: {type:String},
                memoryDimensions: {type:String},
            }
        },
        psu: {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                
                ref: "User",
            },
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',  
            },
            currentPrice: {
                type: Number,
            },
            name: {
                type: String,
                
            },
            image: {
                type: String,
                
            },
            sku: {
                type: String,
                
            },
            brand: {
                type: String,
                
            },
            category: {
                type: String,
                
            },
            description: {
                type: String,
                
            },
            
            rating: {
                type: Number,
                
                default: 0
            },
            numReviews: {
                type: Number,
                
                default: 0
            },
            price: {
                type: Number,
                
                default: 0
            },
            countInStock: {
                type: Number,
                
                default: 0
            },
            productDiscount: {
                type: Number,
                
                default: 0
            },
            
            isOnOffer: {
                type: Boolean,
                
                default: false
            },
            offerName: {
                type: String,
            },
            compatibilityDetails: {
                socketType: {type:String},
                powerConsumption: {type:String},
                chipsetModel: {type:String},
                formFactor: {type:String},
                memorySlots: {type:String},
                expansionSlots: {type:String},
                storageInterface: {type:String},
                ramType: {type:String},
                ramFormFactor: {type:String, enum:['Desktop', 'Laptop', 'NA'], default: 'NA'},
                wattage: {type:String},
                networkCardInterfaces: {type:String}
            },
            warrantyDetails: {
                warrantyPeriod: {type: String, default: "1"},
                returnPeriod: {type: String, default: "7"}
            },
            featureDetails: {
                featureOne: {type: String},
                featureTwo: {type: String},
                featureThree: {type: String},
                featureFour: {type: String},
                featureFive: {type: String},
                featureSix: {type: String},
                featureSeven: {type: String},
                featureEight: {type: String},
                featureNine: {type: String},
                featureTen: {type: String},
            },
            specificationDetails: {
                modelNumber: {type:String},
                gpuChipset: {type:String},
                gpuModel: {type:String},
                pciExpress: {type:String},
                gpuBaseClock: {type:String},
                gpuBoostClock: {
                    type: [String]
                },
                gpuMemoryClock: {type:String},
                gpuMemorySize: {type:String},
                gpuMemoryInterface: {type:String},
                gpuMemoryType: {type:String},
                gpuDirectX: {type:String},
                gpuOpenGl: {type:String},
                gpuResolution: {type:String},
                gpuPorts: {
                    type: [String]
                },
                gpuPowerConnectors: {type:String},
                gpuCudaCores: {type:String},
                wattage: {type:String},
                networkCardInterfaces: {type:String},
                cpuModel: {type:String},
                cpuChipset: {type:String},
                cpuCores: {type:String},
                cpuThreads: {type:String},
                cpuBaseFrequency: {type:String},
                cpuMaxTurboFrequency: {type:String},
                cpuCache: {type:String},
                cpuBusSpeed: {type:String},
                cpuTDP: {type:String},
                cpuProcessorGraphics: {type:String},
                cpuSupportSockets: {type:String},
                moboCpu: {type:String},
                moboChipset: {type:String},
                moboMemory: {type:String},
                moboGraphics: {type:String},
                moboEthernet: {type:String},
                moboAudio: {type:String},
                moboExpansionSlots: {
                    type: [String]
                },
                moboStorage: {
                    type: [String]
                },
                moboUSB: {
                    type: [String]
                },
                moboBackPanelIO: {
                    type: [String]
                },
                moboInternalIO: {
                    type: [String]
                },
                moboBIOS: {type:String},
                moboFormFactor:{type:String},
                moboOS: {type:String},
                RAMModel: {type:String},
                RAMMemorySeries: {type:String},
                RAMMemoryType: {type:String},
                RAMCapacity: {type:String},
                RAMKitType: {type:String},
                RAMSpeed: {type:String},
                coolerModelNumber: {type:String},
                coolerWaterBlock: {type:String},
                coolerFan: {type:String},
                coolerRadiator: {type:String},
                coolerPump: {type:String},
                coolerSockets: {type:String},
                coolerNoise: {type:String},
                coolerDimensions: {type:String},
                psuModelNumber: {type:String},
                psuFormFactor: {type:String},
                psuDimensions: {type:String},
                psuInputRange: {type:String},
                psuTotalOutput: {type:String},
                psuConnectors: {
                    type: [String]
                },
                psuPackageContents: {
                    type: [String]
                },
                psuEfficiency: {type:String},
                cabinetModelNumber: {type:String},
                cabinetChassis: {type:String},
                cabinetFormFactor: {type:String},
                cabinetPreinstalledFans: {type:String},
                cabinetDriveBays: {type:String},
                cabinetFanSupport: {
                    type: [String]
                },
                cabinetLiquidCooling: {
                    type: [String]
                },
                cabinetIOPanel: {type:String},
                memoryModelNumber: {type:String},
                memoryFormFactor: {type:String},
                memoryInterface: {type:String},
                memoryCapacity: {type:String},
                memorySpeed: {type:String},
                memoryDimensions: {type:String},
            }
        },
        coolingSystem: {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                
                ref: "User",
            },
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',  
            },
            currentPrice: {
                type: Number,
            },
            name: {
                type: String,
                
            },
            image: {
                type: String,
                
            },
            sku: {
                type: String,
                
            },
            brand: {
                type: String,
                
            },
            category: {
                type: String,
                
            },
            description: {
                type: String,
                
            },
            
            rating: {
                type: Number,
                
                default: 0
            },
            numReviews: {
                type: Number,
                
                default: 0
            },
            price: {
                type: Number,
                
                default: 0
            },
            countInStock: {
                type: Number,
                
                default: 0
            },
            productDiscount: {
                type: Number,
                
                default: 0
            },
            
            isOnOffer: {
                type: Boolean,
                
                default: false
            },
            offerName: {
                type: String,
            },
            compatibilityDetails: {
                socketType: {type:String},
                powerConsumption: {type:String},
                chipsetModel: {type:String},
                formFactor: {type:String},
                memorySlots: {type:String},
                expansionSlots: {type:String},
                storageInterface: {type:String},
                ramType: {type:String},
                ramFormFactor: {type:String, enum:['Desktop', 'Laptop', 'NA'], default: 'NA'},
                wattage: {type:String},
                networkCardInterfaces: {type:String}
            },
            warrantyDetails: {
                warrantyPeriod: {type: String, default: "1"},
                returnPeriod: {type: String, default: "7"}
            },
            featureDetails: {
                featureOne: {type: String},
                featureTwo: {type: String},
                featureThree: {type: String},
                featureFour: {type: String},
                featureFive: {type: String},
                featureSix: {type: String},
                featureSeven: {type: String},
                featureEight: {type: String},
                featureNine: {type: String},
                featureTen: {type: String},
            },
            specificationDetails: {
                modelNumber: {type:String},
                gpuChipset: {type:String},
                gpuModel: {type:String},
                pciExpress: {type:String},
                gpuBaseClock: {type:String},
                gpuBoostClock: {
                    type: [String]
                },
                gpuMemoryClock: {type:String},
                gpuMemorySize: {type:String},
                gpuMemoryInterface: {type:String},
                gpuMemoryType: {type:String},
                gpuDirectX: {type:String},
                gpuOpenGl: {type:String},
                gpuResolution: {type:String},
                gpuPorts: {
                    type: [String]
                },
                gpuPowerConnectors: {type:String},
                gpuCudaCores: {type:String},
                wattage: {type:String},
                networkCardInterfaces: {type:String},
                cpuModel: {type:String},
                cpuChipset: {type:String},
                cpuCores: {type:String},
                cpuThreads: {type:String},
                cpuBaseFrequency: {type:String},
                cpuMaxTurboFrequency: {type:String},
                cpuCache: {type:String},
                cpuBusSpeed: {type:String},
                cpuTDP: {type:String},
                cpuProcessorGraphics: {type:String},
                cpuSupportSockets: {type:String},
                moboCpu: {type:String},
                moboChipset: {type:String},
                moboMemory: {type:String},
                moboGraphics: {type:String},
                moboEthernet: {type:String},
                moboAudio: {type:String},
                moboExpansionSlots: {
                    type: [String]
                },
                moboStorage: {
                    type: [String]
                },
                moboUSB: {
                    type: [String]
                },
                moboBackPanelIO: {
                    type: [String]
                },
                moboInternalIO: {
                    type: [String]
                },
                moboBIOS: {type:String},
                moboFormFactor:{type:String},
                moboOS: {type:String},
                RAMModel: {type:String},
                RAMMemorySeries: {type:String},
                RAMMemoryType: {type:String},
                RAMCapacity: {type:String},
                RAMKitType: {type:String},
                RAMSpeed: {type:String},
                coolerModelNumber: {type:String},
                coolerWaterBlock: {type:String},
                coolerFan: {type:String},
                coolerRadiator: {type:String},
                coolerPump: {type:String},
                coolerSockets: {type:String},
                coolerNoise: {type:String},
                coolerDimensions: {type:String},
                psuModelNumber: {type:String},
                psuFormFactor: {type:String},
                psuDimensions: {type:String},
                psuInputRange: {type:String},
                psuTotalOutput: {type:String},
                psuConnectors: {
                    type: [String]
                },
                psuPackageContents: {
                    type: [String]
                },
                psuEfficiency: {type:String},
                cabinetModelNumber: {type:String},
                cabinetChassis: {type:String},
                cabinetFormFactor: {type:String},
                cabinetPreinstalledFans: {type:String},
                cabinetDriveBays: {type:String},
                cabinetFanSupport: {
                    type: [String]
                },
                cabinetLiquidCooling: {
                    type: [String]
                },
                cabinetIOPanel: {type:String},
                memoryModelNumber: {type:String},
                memoryFormFactor: {type:String},
                memoryInterface: {type:String},
                memoryCapacity: {type:String},
                memorySpeed: {type:String},
                memoryDimensions: {type:String},
            }
        },
        cabinet: {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                
                ref: "User",
            },
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',  
            },
            currentPrice: {
                type: Number,
            },
            name: {
                type: String,
                
            },
            image: {
                type: String,
                
            },
            sku: {
                type: String,
                
            },
            brand: {
                type: String,
                
            },
            category: {
                type: String,
                
            },
            description: {
                type: String,
                
            },
            
            rating: {
                type: Number,
                
                default: 0
            },
            numReviews: {
                type: Number,
                
                default: 0
            },
            price: {
                type: Number,
                
                default: 0
            },
            countInStock: {
                type: Number,
                
                default: 0
            },
            productDiscount: {
                type: Number,
                
                default: 0
            },
            
            isOnOffer: {
                type: Boolean,
                
                default: false
            },
            offerName: {
                type: String,
            },
            compatibilityDetails: {
                socketType: {type:String},
                powerConsumption: {type:String},
                chipsetModel: {type:String},
                formFactor: {type:String},
                memorySlots: {type:String},
                expansionSlots: {type:String},
                storageInterface: {type:String},
                ramType: {type:String},
                ramFormFactor: {type:String, enum:['Desktop', 'Laptop', 'NA'], default: 'NA'},
                wattage: {type:String},
                networkCardInterfaces: {type:String}
            },
            warrantyDetails: {
                warrantyPeriod: {type: String, default: "1"},
                returnPeriod: {type: String, default: "7"}
            },
            featureDetails: {
                featureOne: {type: String},
                featureTwo: {type: String},
                featureThree: {type: String},
                featureFour: {type: String},
                featureFive: {type: String},
                featureSix: {type: String},
                featureSeven: {type: String},
                featureEight: {type: String},
                featureNine: {type: String},
                featureTen: {type: String},
            },
            specificationDetails: {
                modelNumber: {type:String},
                gpuChipset: {type:String},
                gpuModel: {type:String},
                pciExpress: {type:String},
                gpuBaseClock: {type:String},
                gpuBoostClock: {
                    type: [String]
                },
                gpuMemoryClock: {type:String},
                gpuMemorySize: {type:String},
                gpuMemoryInterface: {type:String},
                gpuMemoryType: {type:String},
                gpuDirectX: {type:String},
                gpuOpenGl: {type:String},
                gpuResolution: {type:String},
                gpuPorts: {
                    type: [String]
                },
                gpuPowerConnectors: {type:String},
                gpuCudaCores: {type:String},
                wattage: {type:String},
                networkCardInterfaces: {type:String},
                cpuModel: {type:String},
                cpuChipset: {type:String},
                cpuCores: {type:String},
                cpuThreads: {type:String},
                cpuBaseFrequency: {type:String},
                cpuMaxTurboFrequency: {type:String},
                cpuCache: {type:String},
                cpuBusSpeed: {type:String},
                cpuTDP: {type:String},
                cpuProcessorGraphics: {type:String},
                cpuSupportSockets: {type:String},
                moboCpu: {type:String},
                moboChipset: {type:String},
                moboMemory: {type:String},
                moboGraphics: {type:String},
                moboEthernet: {type:String},
                moboAudio: {type:String},
                moboExpansionSlots: {
                    type: [String]
                },
                moboStorage: {
                    type: [String]
                },
                moboUSB: {
                    type: [String]
                },
                moboBackPanelIO: {
                    type: [String]
                },
                moboInternalIO: {
                    type: [String]
                },
                moboBIOS: {type:String},
                moboFormFactor:{type:String},
                moboOS: {type:String},
                RAMModel: {type:String},
                RAMMemorySeries: {type:String},
                RAMMemoryType: {type:String},
                RAMCapacity: {type:String},
                RAMKitType: {type:String},
                RAMSpeed: {type:String},
                coolerModelNumber: {type:String},
                coolerWaterBlock: {type:String},
                coolerFan: {type:String},
                coolerRadiator: {type:String},
                coolerPump: {type:String},
                coolerSockets: {type:String},
                coolerNoise: {type:String},
                coolerDimensions: {type:String},
                psuModelNumber: {type:String},
                psuFormFactor: {type:String},
                psuDimensions: {type:String},
                psuInputRange: {type:String},
                psuTotalOutput: {type:String},
                psuConnectors: {
                    type: [String]
                },
                psuPackageContents: {
                    type: [String]
                },
                psuEfficiency: {type:String},
                cabinetModelNumber: {type:String},
                cabinetChassis: {type:String},
                cabinetFormFactor: {type:String},
                cabinetPreinstalledFans: {type:String},
                cabinetDriveBays: {type:String},
                cabinetFanSupport: {
                    type: [String]
                },
                cabinetLiquidCooling: {
                    type: [String]
                },
                cabinetIOPanel: {type:String},
                memoryModelNumber: {type:String},
                memoryFormFactor: {type:String},
                memoryInterface: {type:String},
                memoryCapacity: {type:String},
                memorySpeed: {type:String},
                memoryDimensions: {type:String},
            }
        }
    },
    pcTotalPrice: {
        type: Number,
        required: true
    },
    pcActualPrice: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        default: 1
    }
}, {timestamps: true})

const PrebuiltPC = mongoose.model("PrebuiltPC", preBuiltPcScehma)

export default PrebuiltPC;