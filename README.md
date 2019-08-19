# Chat-Space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|emial|string|null: false, unique: true|
|password|string|null: false, unique: true|
|username|string|null: false, unique: true|
### Association
- has_many :messeages
- has_many :groups_users
- has_many :groups,  through:  :groups_users
##index
- add index :users,  :username

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
### Association
- has_many :messeages
- has_many :groups_users
- has_many :users,  through:  :groups_users

## groups_usersテーブル(中間テーブル)
|Column|Type|Options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## messeageテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false, unique: true|
|name|string|null: false, unique: true|
|body|text||
|image|text||
## Association
- belongs_to :user
- belongs_to :group









