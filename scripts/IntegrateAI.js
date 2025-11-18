Hooks.once('init', () => {
    // Register API Base URL setting
    game.settings.register("integrate-ai", "aiApiBaseUrl", {
        name: "AI API Base URL",
        hint: "Set the base URL for the AI API endpoint (e.g., http://localhost:11434/api)",
        scope: "world",
        config: true,
        default: "http://localhost:11434/api",
        type: String
    });

    // Enter AI Model setting
    game.settings.register("integrate-ai", "aiModel", {
        name: "AI Model",
        hint: "Select the AI model to use for processing",
        scope: "world",
        config: true,
        default: 'gemma3',
        type: String
    });
});

// Module registration
Hooks.on('init', () => {
    IntegrateAI.initialize();
});

class IntegrateAI {

    static async initialize() {
        console.log('Integrate AI Module initialized');
    }

    // Function to get the API base URL
    static getAIAPiBaseUrl() {
        return game.settings.get("integrate-ai", "aiApiBaseUrl");
    }

    // Function to get the AI model
    static getModel() {
        return game.settings.get("integrate-ai", "aiModel");
    }

    // Process content with API
    static async processWithAI(prompt) {

        try {
            const response = await fetch(`${IntegrateAI.getAIAPiBaseUrl()}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: await this.getModel(),
                    prompt: prompt,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('AI API Error:', error);
            throw error;
        }
    }

    // Send chat message to API
    static async chatWithAI(messagesArray) {
        try {
            const response = await fetch(`${IntegrateAI.getAIAPiBaseUrl()}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: await this.getModel(),
                    messages: messagesArray,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.message.content;
        } catch (error) {
            console.error('AI Chat Error:', error);
            throw error;
        }
    }
}







