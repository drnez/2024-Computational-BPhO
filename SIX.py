import matplotlib
import matplotlib.pyplot as plt
import math

matplotlib.use('Qt5Agg')
fig, ax = plt.subplots()

def sin(deg):
    return math.sin(math.radians(deg))
def cos(deg):
    return math.cos(math.radians(deg))
def tan(deg):
    return math.tan(math.radians(deg))
def arcsin(value):
    return math.degrees(math.asin(value))

# user adjustables:
User_u = int(input("Enter 'u': "))
User_h = 2
User_g = 9.81
User_theta = 60

# initalisation:
x = []
y = []
x_now = 0
y_now = User_h
count = 0

Fraction = 100

# Initial Sin/Cos Theta (reduce num of calcs):
ist = sin(User_theta)
ict = cos(User_theta)
itt = tan(User_theta)

Range = ( (User_u*User_u)/User_g ) * ( ist*ict + ict*math.sqrt( ist*ist + (2*User_g*User_h)/(User_u*User_u) ) )
x_step = (1/Fraction) * Range

# distance travelled [NEW]
a = (User_u*User_u)/(User_g*(1+(itt*itt)))
b = itt
c = itt - User_g*Range*(1+itt*itt)/(User_u*User_u)

def z_func(z):
    return 0.5*math.log(abs(math.sqrt(1+z*z)+z))+0.5*z*math.sqrt(1+z*z)

s=a*(z_func(b)-z_func(c))
print("s: " + str(s))

# print to user as useful info
total_time = Range / (User_u*ict)
print("Range: " + str(Range))

while (count <= Fraction):
    x.append(x_now)
    y.append(y_now)

    x_now += x_step
    y_now = User_h + x_now*itt - ( (User_g/(2*User_u*User_u))*(1+itt*itt)*(x_now*x_now) )
    count += 1

ax.plot(x,y)

# re-initalisation:
x = []
y = []
x_now = 0
y_now = User_h
count = 0

Max_theta = arcsin( 1/math.sqrt(2+( (2*User_g*User_h)/(User_u*User_u) )) )
Max_range = ( (User_u*User_u)/User_g ) * math.sqrt(1+(2*User_g*User_h)/(User_u*User_u))
x_step = (1/Fraction) * Max_range

# Initial Sin/Cos Theta (reduce num of calcs):
ist = sin(Max_theta)
ict = cos(Max_theta)
itt = tan(Max_theta)

# print to user as useful info
total_time = Max_range / (User_u*ict)
print("Range: " + str(Max_range))

# distance travelled [NEW]
a = (User_u*User_u)/(User_g*(1+(itt*itt)))
b = itt
c = itt - User_g*Max_range*(1+itt*itt)/(User_u*User_u)

s=a*(z_func(b)-z_func(c))
print("s: " + str(s))
##

while (count <= Fraction):
    x.append(x_now)
    y.append(y_now)

    x_now += x_step
    y_now = User_h + x_now*itt - ( (User_g/(2*User_u*User_u))*(1+itt*itt)*(x_now*x_now) )
    count += 1

ax.plot(x,y)

plt.show()
