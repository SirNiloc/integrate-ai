Hooks.once('init', () => {
    // Register API Base URL setting
    game.settings.register("integrate-ai", "aiApiBaseUrl", {
        name: "AI API Custom Endpoint",
        hint: "Set a custom URL for the AI API endpoint (e.g., http://localhost:11434/api/chat)",
        scope: "client",
        config: true,
        default: "http://localhost:11434/api/chat",
        type: String
    });

    // Enter AI Model setting
    game.settings.register("integrate-ai", "aiModel", {
        name: "AI Model",
        hint: "Select the AI model to use for processing",
        scope: "client",
        config: true,
        default: 'gemma3',
        type: String
    });

    game.settings.register("integrate-ai", "api-key", {
        name: "API Key",
        hint: "Select the AI model to use for processing",
        scope: "client",
        config: true,
        default: '************************',
        type: String
    });

    game.settings.register("integrate-ai", "ai-provider", {
        name: "AI Endpoint",
        hint: "Select the AI endpoint",
        scope: "client",
        config: true,
        default: '',
        type: String,
        choices: ["Custom", "Ollama Local", "OpenAI"]

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


    // Function to get the AI model
    static getModel() {
        return game.settings.get("integrate-ai", "aiModel");
    }

    static async getHeaders() {
        var apiKey = game.settings.get("integrate-ai", "api-key");
        if (apiKey != null && apiKey !== "") {
            return {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        }

        return {
            'Content-Type': 'application/json'
        }
    }

    static async stringToAssistantMessage(str) {
        return { role: "assistant", content: str }
    }
    static async stringToSystemMessage(str) {
        return { role: "system", content: str }
    }
    static async stringToUserMessage(str) {
        var message = { role: "user", content: str }
        return message
    }

    // Process content with API
    static async processWithAI(prompt) {
        return this.chatWithAI([{ role: "user", content: prompt }])
    }

    static async getChatEndpoint() {

        var ai_provider = await game.settings.get("integrate-ai", "ai-provider")
        switch (ai_provider) {
            case "1":
                //Ollama Local
                return 'http://localhost:11434/api/chat'
            case "2":
                //OpenAI
                return `https://api.openai.com/v1/chat/completions`
        }

        return game.settings.get("integrate-ai", "aiApiBaseUrl")

    }

    // Send chat message to API
    static async chatWithAI(messagesArray) {

        var url = await this.getChatEndpoint()

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: await this.getHeaders(),
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

            const content_2_return = this.getProviderResponse(data)


            return content_2_return;
        } catch (error) {
            console.error('AI API Error:', error);
            throw error;
        }
    }

    static async getProviderResponse(data) {
        var ai_provider = await game.settings.get("integrate-ai", "ai-provider")
        switch (ai_provider) {
            case "1":
                //Ollama Local
                return data.message
            case "2":
                //OpenAI
                return data.choices[0].message
        }

        return data
    }

    static async combineUniqueArrays(arr1, arr2) {
        const combinedArray = [...arr1, ...arr2]; // Use spread syntax to combine arrays
        const uniqueSet = new Set(combinedArray);       // Use a Set to automatically remove duplicates
        return Array.from(uniqueSet);                  // Convert the Set back to an array
    }
}

