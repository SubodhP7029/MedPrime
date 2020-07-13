# Generated by Django 3.0.3 on 2020-06-17 17:19

from django.db import migrations, models
import jsonfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0019_deliveryinvoicestorage'),
    ]

    operations = [
        migrations.CreateModel(
            name='installationinvoicestorage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('installationid', models.IntegerField(blank=True, null=True)),
                ('creatorid', models.IntegerField(blank=True, null=True)),
                ('deletorid', models.IntegerField(blank=True, null=True)),
                ('typeofchange', models.CharField(blank=True, max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='installationReport',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('installationid', models.IntegerField(blank=True, null=True)),
                ('customerid', models.IntegerField(blank=True, null=True)),
                ('creatorid', models.IntegerField(blank=True, null=True)),
                ('creatorname', models.CharField(blank=True, max_length=500, null=True)),
                ('customername', models.CharField(max_length=500)),
                ('reportnumber', models.CharField(blank=True, max_length=500, null=True)),
                ('installationDate', models.DateField(blank=True, null=True)),
                ('devicename', models.CharField(blank=True, max_length=500, null=True)),
                ('serialnumber', models.IntegerField(blank=True, null=True)),
                ('imeinumber', models.IntegerField(blank=True, null=True)),
                ('accessories', models.CharField(blank=True, max_length=500, null=True)),
                ('problemDescription', models.CharField(blank=True, max_length=500, null=True)),
                ('actionTaken', models.CharField(blank=True, max_length=500, null=True)),
                ('testing', models.CharField(blank=True, max_length=500, null=True)),
                ('customerComment', models.CharField(blank=True, max_length=500, null=True)),
                ('items', jsonfield.fields.JSONField(blank=True, null=True)),
                ('customerdetails', jsonfield.fields.JSONField(blank=True, null=True)),
            ],
        ),
    ]
