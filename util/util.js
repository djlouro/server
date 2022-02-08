function getGroupFromCookie(req) {
    for (const key in req.cookies) {    
        if (key.includes("GROUP")) {
            //console.log(`${key}: ${req.cookies[key]}`);   
           return req.cookies[key]
        }
    }

    return null;
}

function getUsernameFromCookie (req) {
    for (const key in req.cookies) {
        if (key.includes("userData")) {
            let o = JSON.parse(req.cookies[key])
            return o.Username
        }
    }

    return null
}

function getEmailFromCookie (req) {
    for (const key in req.cookies) { 
        if (key.includes("userData")) {
            let o = JSON.parse(req.cookies[key])
            for (const e in o.UserAttributes) {
                if (o.UserAttributes[e].Name == "email") return o.UserAttributes[e].Value
            }
        }
    }

    return null
}

function isValidCondition (contition) {
    return ["repair", "avalible", "taken"].includes(contition)
}

const isValidTopic = function(topic) {
    return ["weather", "general", "problems", "suggestions", "random"].includes(topic.toLowerCase())
}

const isValidAction = function(action) {
    return ["accept", "decline"].includes(action.toLowerCase())
}

module.exports = { 
    getGroupFromCookie,
    getUsernameFromCookie,
    isValidCondition,
    isValidTopic,
    getEmailFromCookie,
    isValidAction
 };