/**
 * ListTypes enum
 * each case contains:
 * 1. its * unique * string value (also used as PATH)
 * 2. entity to Description converter function
 * 3. entity to Details converter function
 */
export const ListTypes = {

    /* case Films */
    Films: {
        Value: 'films',
        Description: function(entity) {
            return {
                id:    entity.id,
                title: entity.title,
                description: {
                    'Description': entity.description
                }
            }
        },
        Details: function(entity) {
            return {
                title: entity.title,
                details: {
                    'Description':  entity.description,
                    'Director':     entity.director,
                    'Producer':     entity.producer,
                    'Release Date': entity.release_date,
                    'Rate Score':   entity.rt_score
                },
                associations: associations(entity, [
                    ['people',    'people'],
                    ['species',   'species'],
                    ['locations', 'locations'],
                    ['vehicles',  'vehicles']
                ])
            }
        }
    },

    /* case People */
    People: {
        Value: 'people',
        Description: function(entity) {
            return {
                id:    entity.id,
                title: entity.name,
                description: {
                    'Gender': entity.gender,
                    'Age':    entity.age
                }
            }
        },
        Details: function(entity) {
            return {
                title: entity.name,
                details: {
                    'Gender':     entity.gender,
                    'Age':        entity.age,
                    'Eye Color':  entity.eye_color,
                    'Hair Color': entity.hair_color
                },
                associations: associations(entity, [
                    ['films',   'films'],
                    ['species', 'species']
                ])
            }
        }
    },

    /* case Locations */
    Locations: {
        Value: 'locations',
        Description: function(entity) {
            return {
                id:    entity.id,
                title: entity.name,
                description: {
                    'Climate': entity.climate,
                    'Terrain': entity.terrain
                }
            }
        },
        Details: function(entity) {
            return {
                title: entity.name,
                details: {
                    'Climate':       entity.climate,
                    'Terrain':       entity.terrain,
                    'Surface Water': entity.surface_water
                },
                associations: associations(entity, [
                    ['residents', 'people'],
                    ['films',     'films']
                ])
            }
        }
    },

    /* case Species */
    Species: {
        Value: 'species',
        Description: function(entity) {
            return {
                id:    entity.id,
                title: entity.name,
                description: {
                    'Classification': entity.classification
                }
            }
        },
        Details: function(entity) {
            return {
                title: entity.name,
                details: {
                    'Classification': entity.classification,
                    'Eye Colors'    : entity.eye_colors,
                    'Hair Colors'   : entity.hair_colors
                },
                associations: associations(entity, [
                    ['people', 'people'],
                    ['films',  'films']
                ])
            }
        }
    },

    /* case Vehicles */
    Vehicles: {
        Value: 'vehicles',
        Description: function(entity) {
            return {
                id:    entity.id,
                title: entity.name,
                description: {
                    'Description': entity.description
                }
            }
        },
        Details: function(entity) {
            return {
                title: entity.name,
                details: {
                    'Description':   entity.description,
                    'Vehicle Class': entity.vehicle_class,
                    'Length':        entity.length
                },
                associations: associations(entity, [
                    ['pilot', 'people'],
                    ['films', 'films']
                ])
            }
        }
    }
}

// creates associations
function associations(entity, properties) {
    const associations = { }
    properties.forEach(property => {
        const ids = filter(entity, property[0])
        if (ids.length > 0)
            associations[property[1]] = ids
    })
    return associations
}

// filters ids in association array
function filter(entity, property) {

    if (entity.hasOwnProperty(property)) {

        const value = entity[property]
        const ider  = function(url) { return url.substring(url.lastIndexOf('/') + 1) }

        if (Array.isArray(value)) {

            const ids = [ ]
            entity[property].forEach(url => {
                const id = ider(url)
                if (id != '') ids.push(id)
            })
            return ids

        } else if (typeof value === 'string') {

            const id = ider(value)
            if (id != '') return [id]
            else return [ ]

        } else return [ ]
    }
    else return [ ]
}

// returns key of ListTypes by its value
export function key(value) {
    return Object.keys(ListTypes).find(key => ListTypes[key].Value === value)
}

// navigates to page specified by path variable
// for example - 'list', 'description'
export function navigate2(path, params = {}) {

    const form  = document.createElement('form')
    form.method = 'GET'
    form.action = `${path}.html`

    for (const [key, value] of Object.entries(params)) {
        if (params.hasOwnProperty(key)) {
            const param = document.createElement('input')
            param.type  = 'hidden'
            param.name  = key
            param.value = value
            form.appendChild(param)
        }
    }

    document.body.appendChild(form)
    form.submit()
}

// success / failure enum
export const Result = {
    Success: 'Success',
    Failure: 'Failure'
}

// server host url
export const Host = 'https://ghibliapi.herokuapp.com'

// fetchs data from server
export function fetch(url, completion) {
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.onload = function() {
        const response = JSON.parse(this.response)
        if (request.status == 200)
            completion(Result.Success, response)
        else completion(Result.Failure, 'Error Message')
    }
    request.send()
}

// error handler
export function error(message) {
    console.log('Failure', message)
}