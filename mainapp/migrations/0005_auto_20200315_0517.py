# Generated by Django 2.2.5 on 2020-03-15 05:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0004_auto_20200315_0516'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customerprofile',
            name='area',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='customerprofile',
            name='billingarea',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='customerprofile',
            name='billinglandmark',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='customerprofile',
            name='building',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='customerprofile',
            name='landmark',
            field=models.CharField(max_length=50),
        ),
    ]