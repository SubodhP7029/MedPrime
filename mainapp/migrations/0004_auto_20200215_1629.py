# Generated by Django 2.2.5 on 2020-02-15 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0003_auto_20200215_1516'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customerprofile',
            name='address',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='customerprofile',
            name='pincode',
            field=models.IntegerField(blank=True),
        ),
    ]
