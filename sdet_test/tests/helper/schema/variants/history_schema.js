const schema = {
  "type": "array",
  "required": ['data','meta'],
  "properties": {
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ['id','title','variant','payload','user','created_at','updated_at'],
        "properties": {
          "id": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "variant": {
            "type": "object",
            "required": ['id'],
            "properties": {
              "id": {
                "type": "number"
              }
            }
          },
          "payload": {
            "type": "object",
            "required": ['label','category','values'],
            "properties": {
              "label": {
                "type": "string"
              },
              "category": {
                "type": "number"
              },
              "values": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          },
          "user": {
            "type": "object",
            "required": ['id','name','email','type'],
            "properties": {
              "id": {
                "type": "number"
              },
              "name": {
                "type": "string"
              },
              "email": {
                "type": "string"
              },
              "type": {
                "type": "string"
              }
            }
          },
          "created_at": {
            "type": "string"
          },
          "updated_at": {
            "type": "string"
          }
        }
      }
    },
    "meta": {
      "type": "object",
      "required": ['page','limit','total_data','total_page'],
      "properties": {
        "page": {
          "type": "number"
        },
        "limit": {
          "type": "number"
        },
        "total_data": {
          "type": "number"
        },
        "total_page": {
          "type": "number"
        }
      }
    }
  }
}
module.exports = {
  schema
};