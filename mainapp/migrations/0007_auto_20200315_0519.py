# Generated by Django 2.2.5 on 2020-03-15 05:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0006_auto_20200315_0517'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customerprofile',
            name='billinglandmark',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='customerprofile',
            name='landmark',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]