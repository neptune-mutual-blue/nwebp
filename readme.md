# Neptune Mutual WebP

This command line utility converts images to webp format.

## Requirements

* Supports unix or unix-like operating system.
* Install `cwebp` encoder first

### Mac OS

```
brew install webp
```

### Linux

Installation guide:

https://developers.google.com/speed/webp/docs/precompiled


## Usage:

```
nwebp [--help or -h] [--root or -r <path-to-folder>] [--recursive or -R <true|false>] [--deleteSource or -d <true|false>]
```

## Options:

```
--help or -h (boolean)..........................................Displays help
--root or -r <path-to-folder> (string)..........................Search image files under this directory
--recursive or -R <true|false> (string).........................Performs a recursive search
--deleteSource or -d <true|false> (boolean).....................Deletes source files after conversion
```

## Examples

```
nwebp --root ./images --recursive yes --deleteSource no
```

Recursively searches the above folder for all image files and converts each of them to the "webp" format.


```
nwebp --root ./images --recursive yes --deleteSource yes
```

Recursively searches the above folder for all image files and converts each of them to the "webp" format. The source images are removed after conversion.

