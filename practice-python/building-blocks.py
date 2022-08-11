not True  # => False
True and False  # => False
True or False  # => True. Short-circuits.


1 == 1  # => True
2 * 3 == 5  # => False
1 != 1  # => False
2 * 3 != 5  # => True

1 < 10  # True
2 >= 0  # True
1 < 2 < 3  # True. Computes 1 < 2 and 2 < 3


3  # => 3 (int)
3.0  # => 3.0 (float)


1 + 1    # => 2 (int)
1.0 + 1  # => 2.0 (float)
8 - 1    # => 7 (int)
10 * 2   # => 20 (int)
8 * 2.5  # => 20.0 (float)
5 / 2    # => 2.5 (float)
13 / 4   # => 3.25 (float)
9 / 3    # => 3.0 (float)
7 / 1.4  # => 5.0 (float)


7 // 3 # => 2 (int division)
7 % 3  # => 1 (int modulus)
3 ** 2 # => 9 (exponentiate)


greeting = 'Hello'
group = "wørld"

greeting + ' ' + group + "!" # => 'Hello wørld!'


f"{greeting} {group}!"  # f-strings – interpolate expressions into a string
"{greeting} {group}!".format(greeting=greeting, group=group)  # string-formatting by named groups
"{0} {1}!".format(greeting, group)  # string-formatting by positional groups
"%s %s!" % (greeting, group)  # C-style string-formatting

'''A very very
very very
very long string.
'''
"""Another long
quite long string.
"""


print('doesn\'t')  # => doesn't
print("doesn't")   # => doesn't

print('"Yes," he said.')    # => "Yes," he said.
print("\"Yes,\" he said.")  # => "Yes," he said.

print('"Isn\'t," she said.')  # => "Isn't," she said.


greeting = "Hello world! "

greeting.find('lo')   # 3 (-1 if not found)
greeting.replace('llo', 'y')  # => "Hey world!"
greeting.startswith('Hell')  # => True
greeting.isalpha()           # => False (due to '!')

greeting.lower()  # => "hello world! "
greeting.title()  # => "Hello World! "
greeting.upper()  # => "HELLO WORLD! "

greeting.strip()  # => "Hello world!"
greeting.strip('dH !')  # => "ello worl"


str(42)       # => "42"

int("42")     # => 42
float("2.5")  # => 2.5
float("1")    # => 1.0

int("42.5")   # Raises an error (ValueError).


# 'Falsy' values.
bool(None)   # => False
bool(False)  # => False
bool(0)      # => False
bool(0.0)    # => False
bool('')     # => False

# Empty data structures too!
bool([])     # => False


bool(41)     # => True
bool('abc')  # => True
bool(int)    # => True

# Non-empty containers too!
bool([False])  # => True