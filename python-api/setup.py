#!/usr/bin/env python
# -*- coding: utf-8 -*-

from setuptools import setup, find_packages

INSTALL_REQUIRES = [
   'requests',
]

setup(
    name='tikapi',
    version='1.0.0',
    description='TikAPI | TikTok Unofficial API',
    long_description='A fully managed unofficial TikTok app with OAuth capabilities',
    license='TikAPI',
    author='TikAPI',
    author_email='contact@tikapi.io',
    url='https://www.tikapi.io',
    keywords='tikapi, tiktok api, tiktok scraper, tiktok, TikTokApi',
    install_requires=INSTALL_REQUIRES,
    include_package_data=True,
    zip_safe=False,
	packages=find_packages(),
    py_modules=['tikapi'],
)