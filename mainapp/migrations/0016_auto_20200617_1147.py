# Generated by Django 3.0.3 on 2020-06-17 06:17

from django.db import migrations, models
import jsonfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0015_proformainvoice_shippingstate'),
    ]

    operations = [
        migrations.CreateModel(
            name='proformainvoicestorage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('invoiceid', models.IntegerField(blank=True, null=True)),
                ('creatorid', models.IntegerField(blank=True, null=True)),
                ('deletorid', models.IntegerField(blank=True, null=True)),
                ('typeofchange', models.CharField(blank=True, max_length=500)),
            ],
        ),
        migrations.RenameField(
            model_name='quotationinvoice',
            old_name='customeraddress',
            new_name='creatorname',
        ),
        migrations.RenameField(
            model_name='quotationinvoice',
            old_name='customergst',
            new_name='po',
        ),
        migrations.RemoveField(
            model_name='quotationinvoice',
            name='adjustmentamount',
        ),
        migrations.RemoveField(
            model_name='quotationinvoice',
            name='customerpincode',
        ),
        migrations.RemoveField(
            model_name='quotationinvoice',
            name='customerplaceofsupply',
        ),
        migrations.RemoveField(
            model_name='quotationinvoice',
            name='customerstate',
        ),
        migrations.RemoveField(
            model_name='quotationinvoice',
            name='exiprydate',
        ),
        migrations.RemoveField(
            model_name='quotationinvoice',
            name='finalamount',
        ),
        migrations.RemoveField(
            model_name='quotationinvoice',
            name='quotationdate',
        ),
        migrations.RemoveField(
            model_name='quotationinvoice',
            name='quotationnumber',
        ),
        migrations.RemoveField(
            model_name='quotationinvoice',
            name='taxamount',
        ),
        migrations.AddField(
            model_name='quotationinvoice',
            name='customerdetails',
            field=jsonfield.fields.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='quotationinvoice',
            name='invoicedate',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='quotationinvoice',
            name='shippingState',
            field=models.CharField(blank=True, max_length=500),
        ),
        migrations.AlterField(
            model_name='quotationinvoice',
            name='customerid',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='quotationinvoice',
            name='items',
            field=jsonfield.fields.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='quotationinvoice',
            name='quotationid',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]