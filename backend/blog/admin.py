from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import BlogPost

class BlogPostAdmin(SummernoteModelAdmin):
    exclude = ('slug', 'month', 'day')  # These fields are auto-populated
    list_display = ('id', 'title', 'category', 'featured', 'date_created')
    list_display_links = ('id', 'title')
    search_fields = ('title', 'excerpt')
    list_filter = ('category', 'featured', 'date_created')
    list_per_page = 100
    summernote_fields = ('content', )
    readonly_fields = ('date_created',)

admin.site.register(BlogPost, BlogPostAdmin)
