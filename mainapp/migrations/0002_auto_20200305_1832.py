# Generated by Django 2.2.5 on 2020-03-05 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taxinvoice',
            name='po',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
