const express = require("express");
const cors = require("cors");

//import swagger deps
const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// swagger config
const config = swaggerJSDOC({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API DOCUMENTATION",
            description: "Learning api documentation using OpenAPI",
            version: "1.0.0",
            contact: {
                name: "Harerimana Egide",
                email: "egideharerimana085@gmail.com",
                url: "https://github.com/degide"
            }
        },
        components: {
            securitySchemes: {
                bearerAuth: {type: 'http', scheme: 'bearer'}
            }
        },
        security: [{bearerAuth: []}] //global security
    },
    apis: ["./documentation/**/*.yaml"]
});

// swagger endpoint
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(config));

app.get("", (req, res) => {
    return res.status(200).send("Welcome");
});

app.listen(PORT, () => console.log(`SERVER STARTED AT: http://localhost:${PORT}`));