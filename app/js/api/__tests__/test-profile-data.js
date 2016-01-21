'use strict';

var apiProfile = {
    "id": 1,
    "display_name": "Winston Smith",
    "bio": "",
    "organizations": [
        {
            "short_name": "Minitrue",
            "title": "Ministry of Truth"
        }
    ],
    "stewarded_organizations": [
        {
            "short_name": "Minitrue",
            "title": "Ministry of Truth"
        }
    ],
    "user": {
        "username": "wsmith",
        "email": "wsmith@oceania.gov",
        "groups": [
            {
                "name": "ORG_STEWARD"
            }
        ]
    },
    "highest_role": "ORG_STEWARD"
};

var centerProfile = {
    "id": 1,
    "displayName": "Winston Smith",
    "bio": "",
    "organizations": ["Minitrue"],
    "stewardedOrganizations": ["Minitrue"],
    "username": "wsmith",
    "highestRole": "ORG_STEWARD",
    "email": "wsmith@oceania.gov"
};

module.exports = {
    apiProfile: apiProfile,
    centerProfile: centerProfile
};
