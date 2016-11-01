// @exclude
//
// This file is preprocessed by gulp to create the config file
// based on environment variables and/or defaults.
//
// Only modify this file to change the defaults.  In order to set actual configuration values
// for production, modify the file that gets built from this. To temporarily set configurations
// during dev (or at build time), use enviroment variables
//
// @endexclude
window.OzoneConfig = {
    // @ifdef API_URL
    "API_URL": '/* @echo API_URL */',
    // @endif
    // @ifndef API_URL
    "API_URL": 'http://localhost:4440',
    // @endif
    // @ifdef HELP_URL
    "HELP_URL": '/* @echo HELP_URL */',
    // @endif
    // @ifndef HELP_URL
    "HELP_URL": "http://localhost:8888/#/",
    // @endif
    // @ifdef METRICS_URL
    "METRICS_URL": '/* @echo METRICS_URL */',
    // @endif
    // @ifndef METRICS_URL
    "METRICS_URL": "https://www.owfgoss.org:10443/dev/metrics/",
    // @endif
    // @ifdef METRICS_HUD_SITE_ID
    "METRICS_HUD_SITE_ID": '/* @echo METRICS_HUD_SITE_ID */',
    // @endif
    // @ifndef METRICS_HUD_SITE_ID
    "METRICS_HUD_SITE_ID": 3,
    // @endif
    // @ifdef METRICS_WEBTOP_SITE_ID
    "METRICS_WEBTOP_SITE_ID": '/* @echo METRICS_WEBTOP_SITE_ID */',
    // @endif
    // @ifndef METRICS_WEBTOP_SITE_ID
    "METRICS_WEBTOP_SITE_ID": 2,
    // @endif
    // @ifdef CENTER_URL
    "CENTER_URL": '/* @echo CENTER_URL */',
    // @endif
    // @ifndef CENTER_URL
    "CENTER_URL": "http://localhost:8000",
    // @endif
    // @ifdef CENTER_REVIEWS_CHAR_LIMIT
    "CENTER_REVIEWS_CHAR_LIMIT": '/* @echo CENTER_REVIEWS_CHAR_LIMIT */',
    // @endif
    // @ifndef CENTER_REVIEWS_CHAR_LIMIT
    "CENTER_REVIEWS_CHAR_LIMIT": 20,
    // @endif
    // @ifdef HUD_URL
    "HUD_URL": '/* @echo HUD_URL */',
    // @endif
    // @ifndef HUD_URL
    "HUD_URL": "http://localhost:8088",
    // @endif
    // @ifdef WEBTOP_URL
    "WEBTOP_URL": '/* @echo WEBTOP_URL */',
    // @endif
    // @ifndef WEBTOP_URL
    "WEBTOP_URL": "http://localhost:9000/",
    // @endif
    // @ifdef IE_REDIRECT_URL
    "IE_REDIRECT_URL": '/* @echo IE_REDIRECT_URL */',
    // @endif
    // @ifndef IE_REDIRECT_URL
    "IE_REDIRECT_URL": "https://browser-update.org/update.html",
    // @endif
    // @ifdef IWC_URL
    "IWC_URL": '/* @echo IWC_URL */',
    // @endif
    // @ifndef IWC_URL
    "IWC_URL": "https://ozone-development.github.io/iwc",
    // @endif
    // @ifdef DEVELOPER_RESOURCES_URL
    "DEVELOPER_RESOURCES_URL": '/* @echo DEVELOPER_RESOURCES_URL */',
    // @endif
    // @ifndef DEVELOPER_RESOURCES_URL
    "DEVELOPER_RESOURCES_URL": "#",
    // @endif
    // @ifdef APP_TITLE
    "APP_TITLE": '/* @echo APP_TITLE */',
    // @endif
    // @ifndef APP_TITLE
    "APP_TITLE": "AppsMall",
    // @endif
    // @ifdef FEEDBACK_ADDRESS
    "FEEDBACK_ADDRESS": '/* @echo FEEDBACK_ADDRESS */',
    // @endif
    // @ifndef FEEDBACK_ADDRESS
    "FEEDBACK_ADDRESS": "mailto:person@address.com",
    // @endif
    // @ifdef FEEDBACK_ADDRESS
    "HELPDESK_ADDRESS": '/* @echo HELPDESK_ADDRESS */',
    // @endif
    // @ifndef FEEDBACK_ADDRESS
    "HELPDESK_ADDRESS": "mailto:helpdesk@address.com",
    // @endif
    // @ifdef REQUEST_ADDRESS
    "REQUEST_ADDRESS": '/* @echo REQUEST_ADDRESS */',
    // @endif
    // @ifndef REQUEST_ADDRESS
    "REQUEST_ADDRESS": "mailto:request@address.com",
    // @endif
    // @ifdef SOCIAL_CHIRP_ADDRESS
    "SOCIAL_CHIRP_ADDRESS": '/* @echo SOCIAL_CHIRP_ADDRESS */',
    // @endif
    // @ifndef SOCIAL_CHIRP_ADDRESS
    "SOCIAL_CHIRP_ADDRESS": "http://localhost:8000/dist",
    // @endif
    // @ifdef SOCIAL_PIN_ADDRESS
    "SOCIAL_PIN_ADDRESS": '/* @echo SOCIAL_PIN_ADDRESS */',
    // @endif
    // @ifndef SOCIAL_PIN_ADDRESS
    "SOCIAL_PIN_ADDRESS": "http://localhost:8000/dist",
    // @endif
    // @ifdef SOCIAL_CHAT_ADDRESS
    "SOCIAL_CHAT_ADDRESS": '/* @echo SOCIAL_CHAT_ADDRESS */',
    // @endif
    // @ifndef SOCIAL_CHAT_ADDRESS
    "SOCIAL_CHAT_ADDRESS": "http://localhost:8000/dist",
    // @endif
    // @ifdef SOCIAL_BLOG_ADDRESS
    "SOCIAL_BLOG_ADDRESS": '/* @echo SOCIAL_BLOG_ADDRESS */',
    // @endif
    // @ifndef SOCIAL_BLOG_ADDRESS
    "SOCIAL_BLOG_ADDRESS": "http://localhost:8000/dist",
    // @endif
    // @ifdef HELP_DOCS
    "HELP_VIDEOS": '/* @echo HELP_VIDEOS */',
    // @endif
    // @ifndef HELP_DOCS
    'HELP_VIDEOS': {
        'Three Components of AppsMall': '/path/to/document',
        'HUD | Heads Up Display': '/path/to/document',
        'Search for Apps': '/path/to/document',
        'Use Apps': '/path/to/document',
        'How to Submit an App': '/path/to/document',
        'Favorite, Rate & Review Apps': '/path/to/document',
        'Toolbar': '/path/to/document',
        'Dashboard Set Up': '/path/to/document'
    }
    // @endif
};
