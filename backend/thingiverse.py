from dataclasses import dataclass
import json

@dataclass
class ThingiverseModel():
    def __init__(self, id, name, thumbnail, public_url, creator_name, creator_url, f_added, like_count, collect_count, comment_count, is_nsfw, tags, creator_thumbnail):
        self.id = id
        self.name = name
        self.thumbnail = thumbnail
        self.public_url = public_url
        self.creator_name = creator_name
        self.creator_url = creator_url
        self.f_added = f_added
        self.like_count = like_count
        self.collect_count = collect_count
        self.comment_count = comment_count
        self.is_nsfw = is_nsfw
        self.tags = tags
        self.creator_thumbnail = creator_thumbnail
        self.price = "free"
        self.description = self.generate_description_from_tags(tags)

    
    def generate_description_from_tags(self, tags):
        description = ""

        for tag in tags:
            description = description + str(tag["name"]) + " - "

        return description[:-2]
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "thumbnail": self.thumbnail,
            "public_url": self.public_url,
            "creator_name": self.creator_name,
            "creator_url": self.creator_url,
            "f_added": self.f_added,
            "like_count": self.like_count,
            "collect_count": self.collect_count,
            "comment_count": self.comment_count,
            "is_nsfw": self.is_nsfw,
            #"tags": " - ".join([tag.name for tag in self.tags]),
            "tags": json.loads(self.tags),
            "creator_thumbnail": self.creator_thumbnail,
            "price": self.price,
            "description": self.description
        }

