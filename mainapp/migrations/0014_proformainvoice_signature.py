# Generated by Django 3.0.3 on 2020-06-08 11:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0013_remove_proformainvoice_signature'),
    ]

    operations = [
        migrations.AddField(
            model_name='proformainvoice',
            name='signature',
            field=models.BooleanField(blank=True, null=True),
        ),
    ]