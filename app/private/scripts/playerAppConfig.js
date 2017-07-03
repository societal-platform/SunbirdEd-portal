angular.module("playerApp.config", [])
    .constant("config", {
        "SITE": {
            "DEFAULT_LANGUAGE": "en"
        },
        "URL": {
            "BASE_PREFIX": "service/",
            "LEARNER_PREFIX": "v1/learner/",
            "CONTENT_PREFIX": "v1/content/",
            "CONFIG_BASE": "http://localhost:4000/api/sb/v1/",
            "USER": {
                "RESOURCE_BUNDLE": "resourcebundle"
            },
            "COURSE": {
                "SEARCH": "course/search",
                "CREATE": "course/create",
                "UPDATE": "course/update",
                "REVIEW": "course/review",
                "PUBLISH": "course/publish",
                "GET": "course/get",
                "GET_MY_COURSE": "course/get/mycourse",
                "HIERARCHY": "course/hierarchy",
                "UPLOAD_MEDIA": "upload/media",
                "USER_COURSE_SCHEDULE": "user/courses",
                "USER_CONTENT_STATE": "user/content/state",
                "GET_ENROLLED_COURSES": "user/courses",
                "GET_LEARN_OTHER_SECTION": "page/assemble/Course",
                "ENROLL_USER_COURSE": "user/courses/enroll"
            },
            "CONTENT": {
                "SEARCH": "content/search",
                "CREATE": "content/create",
                "UPDATE": "content/update",
                "REVIEW": "content/review",
                "PUBLISH": "content/publish",
                "GET": "content/get",
                "GET_MY_COURSE": "content/get/mycontent",
                "UPLOAD": "content/upload",
                "UPLOAD_MEDIA": "upload/media"
            },
            "AUTH": {
                "LOGIN": "user/login",
                "LOGOUT": "user/logout",
                "PROFILE": "user/getProfile"
            },
            "NOTES": {
                "SEARCH": "notes/search",
                "CREATE": "notes/create",
                "UPDATE": "notes/update",
                "GET": "notes/get",
                "DELETE": "notes/delete"
            },
            "RESOURCE": {
                "GET": "page/assemble/Resources"
            }
        },
        "FILTER": {
            "RESOURCES": {
                "languages": ["Bengali", "English", "Gujarati", "Hindi", "Kannada", "Marathi", "Punjabi", "Tamil", "Telugu"],
                "contentTypes": ["Story", "Worksheet", "Collections", "Game", "Plugin", "Template"],
                "subjects": ["Maths", "English", "Hindi", "Assamese", "Bengali", "Gujarati", "Kannada", "Malayalam", "Marathi", "Nepali", "Oriya", "Punjabi", "Tamil", "Telugu", "Urdu"],
                "boards": ["NCERT", "CBSE", "ICSE", "MSCERT"]
            }
        },
        "MESSAGES": {
            "AUTH": {
                "LOGIN": {
                    "FAILED": "invalid username and password"
                },
                "LOGOUT": {
                    "FAILED": "Logout failed"
                }
            },
            "NOTES": {
                "CREATE": {
                    "START": "We are creating note...",
                    "FAILED": "Creating note is failed, please try again later...",
                    "SUCCESS": "Note created successfully..."
                },
                "GET": {
                    "START": "Fetching note detail, please wait...",
                    "FAILED": "Fetching note detail is failed, please try again later...",
                    "SUCCESS": "Note detail fetched successfully..."
                },
                "REMOVE": {
                    "START": "We are removing note...",
                    "FAILED": "Removing note is failed, please try again later...",
                    "SUCCESS": "Note deleted successfully..."
                },
                "SEARCH": {
                    "START": "We are fetching notes...",
                    "FAILED": "Fetching note is failed, please try again later...",
                    "SUCCESS": "Note detail fetched successfully..."
                },
                "UPDATE": {
                    "START": "We are updating note...",
                    "FAILED": "Updating note is failed, please try again later...",
                    "SUCCESS": "Note updated successfully..."
                }
            },
            "COMMON": {
                "ERROR": "error",
                "INFO": "info",
                "WARNING": "warning",
                "SUCCESS": "success"
            },
            "RESOURCE": {
                "PAGE": {
                    "START": "We are fetching content...",
                    "FAILED": "Fetching content failed, please try again later..."
                }
            },
            "COURSE": {
                "ENROLLED": {
                    "START": "We are fetching enrolled courses...",
                    "FAILED": "Fetching enrolled courses failed, please try again later..."
                },
                "PAGE_API": {
                    "START": "We are fetching data...",
                    "FAILED": "Fetching other courses failed, please try again later..."
                },
                "TOC": {
                    "START": "We are fetching course details...",
                    "ERROR": "Unable to get course schedule details."
                },
                "ENROLL": {
                    "START": "Enrolling....",
                    "ERROR": "Cannot enroll now.Try again later"
                }
            },
            "HOME": {
                "ENROLLED": {
                    "START": "We are fetching enrolled courses...",
                    "FAILED": "Fetching enrolled courses failed, please try again later..."
                },
                "PAGE_API": {
                    "START": "We are fetching data...",
                    "FAILED": "Fetching other courses failed, please try again later..."
                }
            }
        },
        "ekstep_CE_config": {
            "context": {
                "content_id": "",
                "sid": "rctrs9r0748iidtuhh79ust993",
                "user": {
                    "id": "390",
                    "name": "Harish kumar Gangula",
                    "email": "harishg@ilimi.com",
                    "avtar": "https://localhost:3000/images/sunbird_logo.png",
                    "logout": "https://localhost:3000/logout"
                },
                "baseURL": "https://localhost:3000/",
                "editMetaLink": ""
            },
            "config": {
                "baseURL": "http://localhost:5000",
                "pluginRepo": "http://localhost:5000/content-plugins",
                "plugins": [{
                    "id": "org.ekstep.telemetry",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.config",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.stage",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.text",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.shape",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.image",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.audio",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.hotspot",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.scribblepad",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.assessmentbrowser",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.quiz",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.preview",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.assetbrowser",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.colorpicker",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.todo",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.stageconfig",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.unsupported",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.viewecml",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.activitybrowser",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.download",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.collaborator",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.readalongbrowser",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.wordinfobrowser",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.utils",
                    "ver": "1.0",
                    "type": "plugin"
                }, {
                    "id": "org.ekstep.help",
                    "ver": "1.0",
                    "type": "plugin"
                }],
                "enableCorePlugin": false
            }
        },
        "ekstep_CP_config": {
            "context": {
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1OWFiMmE2MDc1YzI0ODU2YjhiYjIzMjg4ZDdhZGNmNSJ9.RLouNX7RQ0VkVv2BYqNtH12D0IzKnBJ_I46xEORwHsU",
                "mode": "play"
            },
            "config": {
                "showEndPage": true,
                "showStartPage": true,
                "host": "https://dev.ekstep.in",
                "apislug": "/api",
                "repos":["/scripts/plugins"],
                "plugins":[{"id": "org.sunbird.iframeEvent","ver": 1.0,"type": "plugin"}]
            },
            
            "baseURL": "/content/preview/preview.html?webview=true"
        }
    });