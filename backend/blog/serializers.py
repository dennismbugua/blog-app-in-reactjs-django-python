from rest_framework import serializers
from .models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    # thumbnail = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogPost
        fields = '__all__'
        lookup_field = 'slug'
    
    # def get_thumbnail(self, obj):
    #     if obj.thumbnail:
    #         request = self.context.get('request')
    #         if request:
    #             return request.build_absolute_uri(obj.thumbnail.url)
    #         return obj.thumbnail.url
    #     return None