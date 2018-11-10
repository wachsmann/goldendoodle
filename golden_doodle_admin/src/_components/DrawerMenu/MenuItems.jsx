// This file is shared across the demos.

import React from 'react';
import {ListItem,ListItemIcon,ListItemText} from '@material-ui/core';
import {Home,FormatListNumbered,People,Folder,Kitchen} from '@material-ui/icons';
import { Link } from 'react-router-dom';

export const MenuItems = (
  <div>
    <Link  to="/"  >
      <ListItem button>
          <ListItemIcon>
            <Home />
          </ListItemIcon>

          <ListItemText primary="Início" />
      </ListItem>
    </Link>
    


    <Link  to="/categorias">
      <ListItem button>
      
        <ListItemIcon>
          <Kitchen />
        </ListItemIcon>
        <ListItemText primary="Categorias" />
      
      </ListItem>
    </Link>
    
    <Link  to="/estoques">
      <ListItem button>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <ListItemText primary="Estoques" />
      
      </ListItem>
    </Link>
    
    <Link  to="/medidas">
      <ListItem button>
        <ListItemIcon>
          <FormatListNumbered />
        </ListItemIcon>
        <ListItemText primary="Unidade de medidas" />
      
      </ListItem>
    </Link>

    <Link  to="/usuarios">
      <ListItem button>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Usuários" />
      
      </ListItem>
    </Link>

  </div>
);

