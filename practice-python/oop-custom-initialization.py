class House:
    def __init__(self, size, color='white'):
        self.size = size
        self.color = color

home = House(1000, color='red')
print(home.size)  # 1000
print(home.color)  # red

mansion = House(25000)
print(mansion.size)  # 25000
print(mansion.color)  # white
