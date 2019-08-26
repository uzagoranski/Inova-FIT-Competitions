// Dependencies
import axios from 'axios';
const stravaClientId = require("../config/keys").stravaClientId;
const stravaClientSecret = require("../config/keys").stravaClientSecret;

// Repository
const stravaRepository = require('../repository/strava');

class StravaClass {
    
    // Authorize user on Strava with incoming authorization code
    async connectStrava(authorizationCode: string, _id: string) {

        const expiration = new Date();

        let tokens = await axios.post('https://www.strava.com/oauth/token', {
            client_id: stravaClientId,
            client_secret: stravaClientSecret,
            code: authorizationCode,
            grant_type: "authorization_code"
        });
        
        return stravaRepository.connectStrava(tokens, _id, expiration);

    }

    // Remove Strava connection
    async disconnectStrava(_id: string) {

        return stravaRepository.disconnectStrava(_id);
        
    }

    // Refresh Strava authentication token
    async refreshAuthenticationToken(refresh_token: string, _id: string) {

        const expiration = new Date();

        let tokens = await axios.post('https://www.strava.com/oauth/token', {
            client_id: stravaClientId,
            client_secret: stravaClientSecret,
            refresh_token: refresh_token,
            grant_type: "refresh_token"
        });

        return stravaRepository.refreshAuthenticationToken(tokens, _id, expiration);

    }
}

module.exports = new StravaClass();