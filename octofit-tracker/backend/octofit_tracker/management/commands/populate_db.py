from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models
from pymongo import MongoClient
from django.conf import settings

# Define models for teams, activities, leaderboard, and workouts
class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        app_label = 'octofit_tracker'

class Activity(models.Model):
    user = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    duration = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Leaderboard(models.Model):
    team = models.CharField(max_length=100)
    points = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    suggested_for = models.CharField(max_length=100)
    class Meta:
        app_label = 'octofit_tracker'

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        client = MongoClient(settings.DATABASES['default']['CLIENT']['host'])
        db = client['octofit_db']

        # Clear collections
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Create unique index on email
        db.users.create_index('email', unique=True)

        # Users (superheroes)
        users = [
            {'username': 'superman', 'email': 'superman@dc.com', 'team': 'DC'},
            {'username': 'batman', 'email': 'batman@dc.com', 'team': 'DC'},
            {'username': 'wonderwoman', 'email': 'wonderwoman@dc.com', 'team': 'DC'},
            {'username': 'ironman', 'email': 'ironman@marvel.com', 'team': 'Marvel'},
            {'username': 'spiderman', 'email': 'spiderman@marvel.com', 'team': 'Marvel'},
            {'username': 'captainamerica', 'email': 'captainamerica@marvel.com', 'team': 'Marvel'},
        ]
        db.users.insert_many(users)

        # Teams
        teams = [
            {'name': 'Marvel'},
            {'name': 'DC'},
        ]
        db.teams.insert_many(teams)

        # Activities
        activities = [
            {'user': 'superman', 'team': 'DC', 'type': 'Flight', 'duration': 60},
            {'user': 'batman', 'team': 'DC', 'type': 'Martial Arts', 'duration': 45},
            {'user': 'ironman', 'team': 'Marvel', 'type': 'Flying Suit', 'duration': 50},
            {'user': 'spiderman', 'team': 'Marvel', 'type': 'Web Swinging', 'duration': 40},
        ]
        db.activities.insert_many(activities)

        # Leaderboard
        leaderboard = [
            {'team': 'Marvel', 'points': 180},
            {'team': 'DC', 'points': 170},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Workouts
        workouts = [
            {'name': 'Super Strength', 'description': 'Heavy lifting and resistance training', 'suggested_for': 'DC'},
            {'name': 'Agility Training', 'description': 'Parkour and acrobatics', 'suggested_for': 'Marvel'},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
