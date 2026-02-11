import { UUID_STORAGE_KEY, METRICS_MAP } from "./constants.js";
import { fetchConstants } from "./services/fetch-constants.js";
import { generateUUIDv4 } from "./generators.js";
import {stateMachineClass} from "./state-machine.js"
import { retrieveFromStorage, storeInStorage } from "./use-storage.js";
import { createVisitorSession, getVisitorSession } from "./services/visitor-session.js"
import {logMetric} from "./services/metrics.js"

export async function initializeStateMachine(){
    console.log("Initializing Machine ...")
    try{
        const {UUID, visitorSession, resetMachine} = await initializeUserSession()
        const config = await initializeConfig()
    
        const stateMachine = new stateMachineClass({config: config, visitorSession: visitorSession, UUID:UUID})
        if(resetMachine === true){
            stateMachine.reset()
        }
        return stateMachine
    }catch(err){
        console.log("Error initializing machine:", err)
        return null
    }
}

export async function initializeUserSession(){
    try{
        let UUID = retrieveFromStorage(UUID_STORAGE_KEY)
        let session = null
    
        // if not session exists
        if(UUID == null){
            console.log("No session found for the visitor. Creating one ...");
            UUID = generateUUIDv4()
            await createVisitorSession(UUID)
            session = await getVisitorSession(UUID)
            storeInStorage(UUID_STORAGE_KEY, UUID)
            await logMetric(METRICS_MAP.VISITORS);
            return {UUID:UUID, visitorSession: session, resetMachine: false}
        }
    
        // if session exists
        session = await getVisitorSession(UUID)
        if(session != null){
            console.log("Session found for the visitor:", UUID, session)
            return {UUID:UUID, visitorSession: session, resetMachine: false}
        }

        //if session corrupted, create a new one
        console.log("Session corrupted. Creating a new one ...");
        UUID = generateUUIDv4()
        await createVisitorSession(UUID)
        session = await getVisitorSession(UUID)
        storeInStorage(UUID_STORAGE_KEY, UUID)
        await logMetric(METRICS_MAP.VISITORS);
        return {UUID:UUID, visitorSession: session, resetMachine: true}

    }catch(err){
        console.log("Error initializing user session:", err)
        return null
    }
}

export async function initializeConfig(){
    try{
        const config = await fetchConstants()
        console.log("Using config:", config)
        return config
    }catch(err){
        console.log("Error initializing config:", err)
        return null
    }
}