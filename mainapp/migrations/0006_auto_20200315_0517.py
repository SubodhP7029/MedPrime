# Generated by Django 2.2.5 on 2020-03-15 05:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0005_auto_20200315_0517'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customerprofile',
            name='address',
        ),
        migrations.RemoveField(
            model_name='customerprofile',
            name='billingaddress',
        ),
    ]