# DATABASE CHANGE LOG #

## Tag 0.5.9 ##
### NO DB Schema Added ##

### Tag 0.5.8 ##
### NO DB Schema Added ###

### MongoDB Collection: ###
```
reindex_log
product_upload_log
```

## Tag 0.5.5 ##
### NO DB Schema Added ##

## Tag 0.5.4 ##
### DB Schema: ###

```
ALTER TABLE `product_vendor` ADD COLUMN `is_contract` TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 AFTER `created
ALTER TABLE `category` ADD COLUMN `breadcrumb` VARCHAR(250) NULL AFTER `parent_id`
ALTER TABLE `category` ADD COLUMN `is_deleted` TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 AFTER `is_active`
ALTER TABLE `category` ADD COLUMN `created_by` INT(11) UNSIGNED NULL AFTER `is_deleted`
ALTER TABLE `attribute_code` ADD COLUMN `description` TEXT NULL AFTER `label`
ALTER TABLE `attribute_set` ADD COLUMN `created_by` INT(11) UNSIGNED NULL AFTER `is_variant`
ALTER TABLE `attribute_set` ADD COLUMN `is_deleted` TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 AFTER `is_variant`
ALTER TABLE `attribute_code` ADD COLUMN `is_deleted` TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 AFTER `type`
ALTER TABLE `attribute_value` ADD COLUMN `is_deleted` TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 AFTER `image_url`
```

### MongoDB Collection: ###
```
category_log
variant_log
```

========================================================================================================================================