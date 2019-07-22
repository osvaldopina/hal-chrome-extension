import {
  createFormControlTree, initId, HAL_FORM_ID_PROP_NAME, findFormElementById,
  removeFormArrayElementById, createNewArrayItem
} from './hal-form-control-tree-creator';

import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ControlGroupVerifier, ControlArrayVerifier } from './hal-form-control-tree-creator.helper.spec';

describe('createFormControlTree', () => {
  it('simple string property with defintions: a', () => {
    initId();
    const rootControl = createFormControlTree({
      'type': 'object',
      'properties': {
        'a': {
          'type': 'string',
          'title': 'a-title',
          'pattern': 'd+',
          'required': true
        }
      }
    });
    new ControlGroupVerifier(rootControl)
      .schema({
        'type': 'object',
        'properties': {
          'a': {
            'type': 'string',
            'title': 'a-title',
            'pattern': 'd+',
            'required': true
          }
        }
      })
      .property('a')
      .control()
      .label('a-title')
      .id(1)
      .schema({
        'type': 'string',
        'title': 'a-title',
        'pattern': 'd+',
        'required': true
      });
  });
  it('object and string property: a.b', () => {
    initId();
    const rootControl = createFormControlTree({
      'type': 'object',
      'properties': {
        'a': {
          'type': 'object',
          'properties': {
            'b': {
              'type': 'string',
              'title': 'b-title'
            }
          }
        }
      }
    });

    new ControlGroupVerifier(rootControl)
      .id(3)
      .schema({
        'type': 'object',
        'properties': {
          'a': {
            'type': 'object',
            'properties': {
              'b': {
                'type': 'string',
                'title': 'b-title'
              }
            }
          }
        }
      })
      .property('a')
      .group()
      .id(2)
      .schema({
        'type': 'object',
        'properties': {
          'b': {
            'type': 'string',
            'title': 'b-title'
          }
        }
      })
      .property('b')
      .control()
      .id(1)
      .label('b-title')
      .schema({
        'type': 'string',
        'title': 'b-title',
      });
  });
  it('two objects and string property: a.b.c', () => {
    initId();
    const rootControl = createFormControlTree({
      'type': 'object',
      'properties': {
        'a': {
          'type': 'object',
          'properties': {
            'b': {
              'type': 'object',
              'properties': {
                'c': {
                  'type': 'string'
                }
              }
            }
          }
        }
      }
    });

    new ControlGroupVerifier(rootControl)
      .schema({
        'type': 'object',
        'properties': {
          'a': {
            'type': 'object',
            'properties': {
              'b': {
                'type': 'object',
                'properties': {
                  'c': {
                    'type': 'string'
                  }
                }
              }
            }
          }
        }
      })
      .property('a')
      .group()
      .id(3)
      .schema({
        'type': 'object',
        'properties': {
          'b': {
            'type': 'object',
            'properties': {
              'c': {
                'type': 'string'
              }
            }
          }
        }
      })
      .property('b')
      .group()
      .id(2)
      .schema({
        'type': 'object',
        'properties': {
          'c': {
            'type': 'string'
          }
        }
      })
      .property('c')
      .control()
      .id(1)
      .schema({
        'type': 'string',
      });
  });
  it('anonymous array property: []', () => {
    initId();
    const rootControl = createFormControlTree({
      'type': 'array',
      'items': {
        'type': 'string',
      }
    });

    new ControlArrayVerifier(rootControl)
      .id(2)
      .schema({
        'type': 'array',
        'items': {
          'type': 'string',
        }
      })
      .control()
      .id(1)
      .schema({
        'type': 'string',
      });
  });
  it('anonymous array property and a string property: [].a', () => {
    initId();
    const rootControl = createFormControlTree({
      'type': 'array',
      'items': {
        'type': 'object',
        'properties': {
          'a': {
            'type': 'string',
          }
        }
      }
    });

    new ControlArrayVerifier(rootControl)
      .id(3)
      .schema({
        'type': 'array',
        'items': {
          'type': 'object',
          'properties': {
            'a': {
              'type': 'string',
            }
          }
        }
      })
      .group()
      .id(2)
      .schema({
        'type': 'object',
        'properties': {
          'a': {
            'type': 'string',
          }
        }
      })
      .property('a')
      .control()
      .id(1)
      .schema({
        'type': 'string',
      });
  });
  it('one named array property: a[]', () => {
    initId();
    const rootControl = createFormControlTree({
      'type': 'object',
      'properties': {
        'a': {
          'type': 'array',
          'items': {
            'type': 'string',
            'title': 'a'
          }
        }
      }
    });

    new ControlGroupVerifier(rootControl)
      .id(3)
      .schema({
        'type': 'object',
        'properties': {
          'a': {
            'type': 'array',
            'items': {
              'type': 'string',
              'title': 'a'
            }
          }
        }
      })
      .property('a')
      .array()
      .id(2)
      .schema({
        'type': 'array',
        'items': {
          'type': 'string',
          'title': 'a'
        }
      })
      .control()
      .id(1)
      .label('a')
      .schema({
        'type': 'string',
        'title': 'a'
      });
  });
  it('named array and string property: a[].b', () => {
    initId();
    const rootControl = createFormControlTree({
      'type': 'object',
      'properties': {
        'a': {
          'type': 'array',
          'items': {
            'type': 'object',
            'properties': {
              'b': {
                'type': 'string',
                'title': 'b'
              }
            }
          }
        }
      }
    });

    new ControlGroupVerifier(rootControl)
      .id(4)
      .schema({
        'type': 'object',
        'properties': {
          'a': {
            'type': 'array',
            'items': {
              'type': 'object',
              'properties': {
                'b': {
                  'type': 'string',
                  'title': 'b'
                }
              }
            }
          }
        }
      })
      .property('a')
      .array()
      .id(3)
      .schema({
        'type': 'array',
        'items': {
          'type': 'object',
          'properties': {
            'b': {
              'type': 'string',
              'title': 'b'
            }
          }
        }
      })
      .group()
      .id(2)
      .schema({
        'type': 'object',
        'properties': {
          'b': {
            'type': 'string',
            'title': 'b'
          }
        }
      })
      .property('b')
      .control()
      .id(1)
      .label('b')
      .schema({
        'type': 'string',
        'title': 'b'
      });
  });
  it('object property and named array: a.b[]', () => {
    initId();
    const rootControl = createFormControlTree({
      'type': 'object',
      'properties': {
        'a': {
          'type': 'object',
          'properties': {
            'b': {
              'type': 'array',
              'items': {
                'type': 'string',
                'title': 'b'
              }
            }
          }
        }
      }
    });

    new ControlGroupVerifier(rootControl)
      .id(4)
      .schema({
        'type': 'object',
        'properties': {
          'a': {
            'type': 'object',
            'properties': {
              'b': {
                'type': 'array',
                'items': {
                  'type': 'string',
                  'title': 'b'
                }
              }
            }
          }
        }
      })
      .property('a')
      .group()
      .id(3)
      .schema({
        'type': 'object',
        'properties': {
          'b': {
            'type': 'array',
            'items': {
              'type': 'string',
              'title': 'b'
            }
          }
        }
      })
      .property('b')
      .array()
      .id(2)
      .schema({
        'type': 'array',
        'items': {
          'type': 'string',
          'title': 'b'
        }
      })
      .control()
      .id(1)
      .schema({
        'type': 'string',
        'title': 'b'
      })
      .label('b');
  });
  it('object property, array property, string property: a.b[].c', () => {
    initId();
    const rootControl = createFormControlTree({
      'type': 'object',
      'properties': {
        'a': {
          'type': 'object',
          'properties': {
            'b': {
              'type': 'array',
              'items': {
                'type': 'object',
                'properties': {
                  'c': {
                    'type': 'string',
                    'title': 'c'
                  }
                }
              }
            }
          }
        }
      }
    });

    new ControlGroupVerifier(rootControl)
      .id(5)
      .schema({
        'type': 'object',
        'properties': {
          'a': {
            'type': 'object',
            'properties': {
              'b': {
                'type': 'array',
                'items': {
                  'type': 'object',
                  'properties': {
                    'c': {
                      'type': 'string',
                      'title': 'c'
                    }
                  }
                }
              }
            }
          }
        }
      })
      .property('a')
      .group()
      .id(4)
      .schema({
        'type': 'object',
        'properties': {
          'b': {
            'type': 'array',
            'items': {
              'type': 'object',
              'properties': {
                'c': {
                  'type': 'string',
                  'title': 'c'
                }
              }
            }
          }
        }
      })
      .property('b')
      .array()
      .id(3)
      .schema({
        'type': 'array',
        'items': {
          'type': 'object',
          'properties': {
            'c': {
              'type': 'string',
              'title': 'c'
            }
          }
        }
      })
      .group()
      .id(2)
      .property('c')
      .control()
      .id(1)
      .schema({
        'type': 'string',
        'title': 'c'
      })
      .label('c');
  });
});
describe('findFormElementById', () => {
  it('findFormElementById', () => {
    initId();
    const formBuilder = new FormBuilder();
    const rootControl = formBuilder.group({
      'a': formBuilder.group({
        'b': formBuilder.group({
          'c': formBuilder.control([])
        }),
        'd': formBuilder.array([
          formBuilder.control([]),
          formBuilder.control([])
        ])
      })
    });
    const HAL_FORM_EXTRA_INFO = '_halFormExtraInfo';
    rootControl[HAL_FORM_ID_PROP_NAME] = 1;
    rootControl[HAL_FORM_EXTRA_INFO] = 10;
    rootControl.controls.a[HAL_FORM_ID_PROP_NAME] = 2;
    rootControl.controls.a[HAL_FORM_EXTRA_INFO] = 20;
    (rootControl.controls.a as FormGroup).controls.b[HAL_FORM_ID_PROP_NAME] = 3;
    (rootControl.controls.a as FormGroup).controls.b[HAL_FORM_EXTRA_INFO] = 30;
    ((rootControl.controls.a as FormGroup).controls.b as FormGroup).controls.c[HAL_FORM_ID_PROP_NAME] = 4;
    ((rootControl.controls.a as FormGroup).controls.b as FormGroup).controls.c[HAL_FORM_EXTRA_INFO] = 40;
    (rootControl.controls.a as FormGroup).controls.d[HAL_FORM_ID_PROP_NAME] = 5;
    (rootControl.controls.a as FormGroup).controls.d[HAL_FORM_EXTRA_INFO] = 50;

    ((rootControl.controls.a as FormGroup).controls.d as FormArray).controls[0][HAL_FORM_ID_PROP_NAME] = 6;
    ((rootControl.controls.a as FormGroup).controls.d as FormArray).controls[0][HAL_FORM_EXTRA_INFO] = 60;
    ((rootControl.controls.a as FormGroup).controls.d as FormArray).controls[1][HAL_FORM_ID_PROP_NAME] = 7;
    ((rootControl.controls.a as FormGroup).controls.d as FormArray).controls[1][HAL_FORM_EXTRA_INFO] = 70;


    expect(findFormElementById(rootControl, 1)).toBeDefined();
    expect(findFormElementById(rootControl, 1)).not.toBeNull();
    expect(findFormElementById(rootControl, 1)[HAL_FORM_EXTRA_INFO]).toBe(10);

    expect(findFormElementById(rootControl, 2)).toBeDefined();
    expect(findFormElementById(rootControl, 2)).not.toBeNull();
    expect(findFormElementById(rootControl, 2)[HAL_FORM_EXTRA_INFO]).toBe(20);

    expect(findFormElementById(rootControl, 3)).toBeDefined();
    expect(findFormElementById(rootControl, 3)).not.toBeNull();
    expect(findFormElementById(rootControl, 3)[HAL_FORM_EXTRA_INFO]).toBe(30);

    expect(findFormElementById(rootControl, 4)).toBeDefined();
    expect(findFormElementById(rootControl, 4)).not.toBeNull();
    expect(findFormElementById(rootControl, 4)[HAL_FORM_EXTRA_INFO]).toBe(40);

    expect(findFormElementById(rootControl, 5)).toBeDefined();
    expect(findFormElementById(rootControl, 5)).not.toBeNull();
    expect(findFormElementById(rootControl, 5)[HAL_FORM_EXTRA_INFO]).toBe(50);

    expect(findFormElementById(rootControl, 6)).toBeDefined();
    expect(findFormElementById(rootControl, 6)).not.toBeNull();
    expect(findFormElementById(rootControl, 6)[HAL_FORM_EXTRA_INFO]).toBe(60);

    expect(findFormElementById(rootControl, 7)).toBeDefined();
    expect(findFormElementById(rootControl, 7)).not.toBeNull();
    expect(findFormElementById(rootControl, 7)[HAL_FORM_EXTRA_INFO]).toBe(70);
  });

});
describe('findFormElementById', () => {
  it('findFormElementById', () => {
    initId();
    const formBuilder = new FormBuilder();
    const rootControl = formBuilder.group({
      'a': formBuilder.group({
        'b': formBuilder.group({
          'c': formBuilder.control([])
        }),
        'd': formBuilder.array([
          formBuilder.control([]),
          formBuilder.control([])
        ])
      })
    });
    const HAL_FORM_EXTRA_INFO = '_halFormExtraInfo';
    rootControl[HAL_FORM_ID_PROP_NAME] = 1;
    rootControl[HAL_FORM_EXTRA_INFO] = 10;
    rootControl.controls.a[HAL_FORM_ID_PROP_NAME] = 2;
    rootControl.controls.a[HAL_FORM_EXTRA_INFO] = 20;
    (rootControl.controls.a as FormGroup).controls.b[HAL_FORM_ID_PROP_NAME] = 3;
    (rootControl.controls.a as FormGroup).controls.b[HAL_FORM_EXTRA_INFO] = 30;
    ((rootControl.controls.a as FormGroup).controls.b as FormGroup).controls.c[HAL_FORM_ID_PROP_NAME] = 4;
    ((rootControl.controls.a as FormGroup).controls.b as FormGroup).controls.c[HAL_FORM_EXTRA_INFO] = 40;
    (rootControl.controls.a as FormGroup).controls.d[HAL_FORM_ID_PROP_NAME] = 5;
    (rootControl.controls.a as FormGroup).controls.d[HAL_FORM_EXTRA_INFO] = 50;

    ((rootControl.controls.a as FormGroup).controls.d as FormArray).controls[0][HAL_FORM_ID_PROP_NAME] = 6;
    ((rootControl.controls.a as FormGroup).controls.d as FormArray).controls[0][HAL_FORM_EXTRA_INFO] = 60;
    ((rootControl.controls.a as FormGroup).controls.d as FormArray).controls[1][HAL_FORM_ID_PROP_NAME] = 7;
    ((rootControl.controls.a as FormGroup).controls.d as FormArray).controls[1][HAL_FORM_EXTRA_INFO] = 70;


    expect(findFormElementById(rootControl, 1)).toBeDefined();
    expect(findFormElementById(rootControl, 1)).not.toBeNull();
    expect(findFormElementById(rootControl, 1)[HAL_FORM_EXTRA_INFO]).toBe(10);

    expect(findFormElementById(rootControl, 2)).toBeDefined();
    expect(findFormElementById(rootControl, 2)).not.toBeNull();
    expect(findFormElementById(rootControl, 2)[HAL_FORM_EXTRA_INFO]).toBe(20);

    expect(findFormElementById(rootControl, 3)).toBeDefined();
    expect(findFormElementById(rootControl, 3)).not.toBeNull();
    expect(findFormElementById(rootControl, 3)[HAL_FORM_EXTRA_INFO]).toBe(30);

    expect(findFormElementById(rootControl, 4)).toBeDefined();
    expect(findFormElementById(rootControl, 4)).not.toBeNull();
    expect(findFormElementById(rootControl, 4)[HAL_FORM_EXTRA_INFO]).toBe(40);

    expect(findFormElementById(rootControl, 5)).toBeDefined();
    expect(findFormElementById(rootControl, 5)).not.toBeNull();
    expect(findFormElementById(rootControl, 5)[HAL_FORM_EXTRA_INFO]).toBe(50);

    expect(findFormElementById(rootControl, 6)).toBeDefined();
    expect(findFormElementById(rootControl, 6)).not.toBeNull();
    expect(findFormElementById(rootControl, 6)[HAL_FORM_EXTRA_INFO]).toBe(60);

    expect(findFormElementById(rootControl, 7)).toBeDefined();
    expect(findFormElementById(rootControl, 7)).not.toBeNull();
    expect(findFormElementById(rootControl, 7)[HAL_FORM_EXTRA_INFO]).toBe(70);
  });

});
describe('removeFormArrayElement', () => {
  it('removeFormArrayElement', () => {
    const formBuilder = new FormBuilder();
    const rootControl = formBuilder.group({
      'a': formBuilder.group({
        'b': formBuilder.group({
          'c': formBuilder.control([])
        }),
        'd': formBuilder.array([
          formBuilder.control([]),
          formBuilder.control([])
        ])
      })
    });
    const HAL_FORM_EXTRA_INFO = '_halFormExtraInfo';
    rootControl[HAL_FORM_ID_PROP_NAME] = 1;
    rootControl[HAL_FORM_EXTRA_INFO] = 10;
    rootControl.controls.a[HAL_FORM_ID_PROP_NAME] = 2;
    rootControl.controls.a[HAL_FORM_EXTRA_INFO] = 20;
    (rootControl.controls.a as FormGroup).controls.b[HAL_FORM_ID_PROP_NAME] = 3;
    (rootControl.controls.a as FormGroup).controls.b[HAL_FORM_EXTRA_INFO] = 30;
    ((rootControl.controls.a as FormGroup).controls.b as FormGroup).controls.c[HAL_FORM_ID_PROP_NAME] = 4;
    ((rootControl.controls.a as FormGroup).controls.b as FormGroup).controls.c[HAL_FORM_EXTRA_INFO] = 40;
    (rootControl.controls.a as FormGroup).controls.d[HAL_FORM_ID_PROP_NAME] = 5;
    (rootControl.controls.a as FormGroup).controls.d[HAL_FORM_EXTRA_INFO] = 50;

    ((rootControl.controls.a as FormGroup).controls.d as FormArray).controls[0][HAL_FORM_ID_PROP_NAME] = 6;
    ((rootControl.controls.a as FormGroup).controls.d as FormArray).controls[0][HAL_FORM_EXTRA_INFO] = 60;
    ((rootControl.controls.a as FormGroup).controls.d as FormArray).controls[1][HAL_FORM_ID_PROP_NAME] = 7;
    ((rootControl.controls.a as FormGroup).controls.d as FormArray).controls[1][HAL_FORM_EXTRA_INFO] = 70;

    removeFormArrayElementById(rootControl, 6);

    removeFormArrayElementById(rootControl, 7);

    expect(findFormElementById(rootControl, 6)).toBeNull();
    expect(findFormElementById(rootControl, 7)).toBeNull();
    expect(((rootControl.controls.a as FormGroup).controls.d as FormArray).controls.length).toBe(0);
  });
});
describe('createNewArrayItem', () => {
  it('createNewArrayItem - FormArray item simple string property', () => {
    initId();
    const rootControl = createFormControlTree({
      'type': 'array',
      'items': {
        'type': 'string',
        'title': 'a-title'
      }
    });

    expect(findFormElementById(rootControl, 2) instanceof FormArray).toBeTruthy();

    createNewArrayItem(rootControl, 2);
    expect((rootControl as FormArray).controls.length).toBe(2);
    expect((rootControl as FormArray).controls[0] instanceof FormControl).toBeTruthy();
    expect((rootControl as FormArray).controls[1] instanceof FormControl).toBeTruthy();

  });
  it('createNewArrayItem - FormArray item object property', () => {
    initId();
    const rootControl = createFormControlTree({
      'type': 'array',
      'items': {
        'type': 'object',
        'properties': {
          'a': {
            'type': 'string',
            'title': 'a-title'
          }
        }
      }
    });

    expect(findFormElementById(rootControl, 3) instanceof FormArray).toBeTruthy();

    createNewArrayItem(rootControl, 3);
    expect((rootControl as FormArray).controls.length).toBe(2);

    expect((rootControl as FormArray).controls[0] instanceof FormGroup).toBeTruthy();
    expect((rootControl as FormArray).controls[1] instanceof FormGroup).toBeTruthy();
  });
});
