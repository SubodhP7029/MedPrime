# Generated by Django 2.2.5 on 2020-03-15 05:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0003_auto_20200315_0512'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customerprofile',
            name='billingbuilding',
            field=models.CharField(max_length=50),
        ),
    ]