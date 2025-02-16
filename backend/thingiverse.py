from dataclasses import dataclass

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

