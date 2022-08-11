isinstance(4, object)        # => True
isinstance("Hello", object)  # => True
isinstance(None, object)     # => True
isinstance([1,2,3], object)  # => True
isinstance(str, object)      # => True

type(1)         # => <class 'int'>
type("Hello")   # => <class 'str'>
type(None)      # => <class 'NoneType'>

type(int)       # => <class 'type'>
type(type(int)) # => <class 'type'>

id(41)  # => 4361704848 (for example)
