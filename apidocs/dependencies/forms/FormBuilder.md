# dependencies\forms\FormBuilder
[API index](../../API-index.md)






* Class name: FormBuilder
* Namespace: dependencies\forms




## Class index

**Properties**
* [`protected mixed $options`](#property-options)
* [`private mixed $fields`](#property-fields)
* [`private mixed $id`](#property-id)
* [`private mixed $model`](#property-model)
* [`private mixed $relations`](#property-relations)

**Methods**
* [`public mixed __construct(\dependencies\BaseModel $model, array $options)`](#method-__construct)
* [`public string id()`](#method-id)
* [`public mixed render(array $options)`](#method-render)
* [`protected string detect_optimal_field(string $column_name, \dependencies\forms\Data $field, array $override)`](#method-detect_optimal_field)
* [`protected string detect_optimal_relation_field(string $column_name, \dependencies\forms\Data $relation)`](#method-detect_optimal_relation_field)
* [`protected mixed find_additional_relation_data(array $relation)`](#method-find_additional_relation_data)
* [`protected mixed generate_fields()`](#method-generate_fields)
* [`protected mixed map_relations()`](#method-map_relations)







# Properties


## Property `$options`

```
protected mixed $options
```





* Visibility: **protected**


## Property `$fields`

```
private mixed $fields = array()
```





* Visibility: **private**


## Property `$id`

```
private mixed $id
```





* Visibility: **private**


## Property `$model`

```
private mixed $model
```





* Visibility: **private**


## Property `$relations`

```
private mixed $relations = array()
```





* Visibility: **private**


# Methods


## Method `__construct`

```
mixed dependencies\forms\FormBuilder::__construct(\dependencies\BaseModel $model, array $options)
```

Creates a new form builder instance.



* Visibility: **public**

#### Arguments

* $model **[dependencies\BaseModel](../../dependencies/BaseModel.md)** - The model that this form builder is building the form for.
* $options **array** - An array of options to modify the FormBuilder.



## Method `id`

```
string dependencies\forms\FormBuilder::id()
```

Returns the unique ID of this form.



* Visibility: **public**



## Method `render`

```
mixed dependencies\forms\FormBuilder::render(array $options)
```

Outputs the form to the output stream.



* Visibility: **public**

#### Arguments

* $options **array** - The options for the rendering of this form.
   string/language_id $force_language The language code or ID of the language to force the form to be translated to.
   string $translate_component The component name from which to use component specific translations.
   string/Url $action The action URL to use.
     Default: generate one in the format &quot;action=&lt;component&gt;/&lt;insert|update&gt;_&lt;model_name&gt;&quot;.



## Method `detect_optimal_field`

```
string dependencies\forms\FormBuilder::detect_optimal_field(string $column_name, \dependencies\forms\Data $field, array $override)
```

Based on the given field data, tries to detect the class name of the optimal field type.

<p>Note that this is for detecting the base type field and does not take relations into account.
Defined relations should override this value.</p>

* Visibility: **protected**

#### Arguments

* $column_name **string** - The name of the database column to search the optimal field for.
* $field **dependencies\forms\Data** - The field meta information.
* $override **array** - Overrides for this field that may apply.



## Method `detect_optimal_relation_field`

```
string dependencies\forms\FormBuilder::detect_optimal_relation_field(string $column_name, \dependencies\forms\Data $relation)
```

Based on the given field data, tries to detect the class name of the optimal field type.

<p>Note that this is for detecting the relation field and does not take base types into account.
This should be used to override base types.</p>

* Visibility: **protected**

#### Arguments

* $column_name **string** - The name of the database column to search the optimal field for.
* $relation **dependencies\forms\Data** - &amp;$relation The normalized relation information.



## Method `find_additional_relation_data`

```
mixed dependencies\forms\FormBuilder::find_additional_relation_data(array $relation)
```

Depending on all the earlier detected variables gathers all relevant data about the relation.

<p>For example when applicable gathers an option_set.</p>

* Visibility: **protected**

#### Arguments

* $relation **array** - &amp;$relation The relation to find additional data for.



## Method `generate_fields`

```
mixed dependencies\forms\FormBuilder::generate_fields()
```

Create instances of each of the fields in the model.



* Visibility: **protected**



## Method `map_relations`

```
mixed dependencies\forms\FormBuilder::map_relations()
```

Takes all provided relations from the options, then maps and normalizes them.



* Visibility: **protected**

