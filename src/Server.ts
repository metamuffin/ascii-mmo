import { ClientHandler } from './ClientHandler.js';
import { app } from './app';
import { NetworkWorld } from './NetworkWorld';
import { ChatBox } from './ChatBox.js';
import { InventoryDisplay } from './InventoryDisplay.js';
import { TileMapObject } from './TileMapObject.js';
import { NPC } from './NPC.js';
import { Vector3 } from '../client/shared/Vector3.js';
import { DialogueBuilder } from './DialogueBuilder';
import { dialogues } from './NPCData';
import { QuestsDisplay } from './QuestsDisplay.js';
import { WorldEditor } from './WorldEditor.js';

export class Server {
    private clients = new Array<ClientHandler>();
    public world = new NetworkWorld(this);
    public inventoryDisplay = new InventoryDisplay();
    public questsDisplay = new QuestsDisplay();
    
    addClient(client: ClientHandler) {
        this.clients.push(client);
    }

    start() {
        app.ws('/server', (ws, req) => {
            var clientHandler = new ClientHandler(this, ws);
            clientHandler.initializeEvents();
            this.addClient(clientHandler);
            clientHandler.initPlayerEntity();
        });

        this.world.addChild(new ChatBox());
        this.world.addChild(this.inventoryDisplay);
        this.world.addChild(this.questsDisplay);
        this.world.addChild(new WorldEditor());
        this.world.load();


    }

    broadcast(type: string, data: any) {
        var data_to_send = JSON.stringify({
            "type": type,
            "json": data
        });

        for(var i = 0; i < this.clients.length; i++) {
            this.clients[i].emitString(data_to_send);
        }
    }
}
