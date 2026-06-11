from setuptools import find_packages, setup

with open("requirements.txt") as f:
    install_requires = f.read().strip().splitlines()

setup(
    name="high_speed_login",
    version="0.0.1",
    description="Custom ERPNext login page branding",
    author="High Speed IT",
    author_email="support@highspeed.local",
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=install_requires,
)
